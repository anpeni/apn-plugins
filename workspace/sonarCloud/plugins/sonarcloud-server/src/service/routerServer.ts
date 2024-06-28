import express, { Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { errorHandler, loadBackendConfig } from '@backstage/backend-common';
import { SonarCloudClient } from '../api/sonarCloudApiClient';
import axios from 'axios';
// const {
//   setupDatabase,
//   fetchAllProjects,
//   updateLatestAnalysis,
//   fetchLastSevenVulnerabilities,
//   insertProjectsData,
//   insertAnalysis,
// } = require('./database');

import {
  setupDatabase,
  fetchAllProjects,
  updateLatestAnalysis,
  fetchLastSevenVulnerabilities,
  insertProjectsData,
  insertAnalysis,
} from './database';
import { RouterOptions, Project } from '../types';
import { broadcastEvent, eventFunction } from './sse';


// Funciones auxiliares
async function fetchProjects(
  client: SonarCloudClient,
  logger: Logger,
): Promise<Project[]> {
  const response = await client.getProjects();
  if (!response || !response.components) {
    throw new Error('No se pudo obtener los proyectos desde SonarCloud');
  }

  // Intenta obtener métricas para cada proyecto y filtra los que no tienen métricas
  const projectsWithMetrics: Project[] = (
    await Promise.all(
      response.components.map(async project => {
        try {
          const metrics = await client.getProjectMeasures(
            project.key,
            'bugs,vulnerabilities,code_smells,coverage,security_rating,sqale_rating',
          );
          return metrics ? { key: project.key, metrics } : null; // Solo devuelve proyectos con métricas
        } catch (error) {
          logger.error(
            `Error obteniendo métricas para el proyecto ${project.key}`,
            error,
          );
          return null; // Devuelve null si no se pueden obtener métricas
        }
      }),
    )
  ).filter(project => project !== null) as Project[]; // Filtra proyectos null

  return projectsWithMetrics;
}

/**
 * Función para realizar análisis periódico de los proyectos.
 */
function periodAnalysis(client: SonarCloudClient, logger: Logger) {
  setInterval(async () => {
    try {
      const projects = await fetchProjects(client, logger);

      await insertAnalysis(projects);
      await axios.post('https://app.dev.svsm.neoris.cloud/api/sonarcloud-server/sonar-webhook', {
        message: 'Análisis de proyectos actualizado'
      });
    } catch (error) {
      logger.error(
        'Error obteniendo datos de SonarCloud de forma periódica',
        error,
      );
    }
  }, 25200000); // Ajusta este intervalo según sea necesario
}

/**
 * Función para recuperar datos de proyectos y almacenarlos en la base de datos.
 */
async function fetchAndStoreProjectData(
  client: SonarCloudClient,
  logger: Logger,
) {
  try {
    await setupDatabase(); // Asegurarse de que la tabla exista
    const projects = await fetchProjects(client, logger);
    if (projects.length > 0) {
      await insertProjectsData(projects);
      await updateLatestAnalysis(projects);
    }
    return projects;
  } catch (error) {
    logger.error('Error obteniendo y almacenando datos de SonarCloud', error);
    throw new Error('Error obteniendo y almacenando datos de SonarCloud');
  }
}

// Crea un enrutador
export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.info('Inicializando SonarCloud-SERVER Backend');

  const router = Router();

  // Configura el cliente de SonarCloud
  const sonarCloudBaseUrl = config.getString('sonarcloud.baseUrl');
  const apiKey = config.getString('sonarcloud.apiKey');
  const organization = config.getString('sonarcloud.organization');
  const client = new SonarCloudClient(sonarCloudBaseUrl, apiKey, organization);


  await fetchAndStoreProjectData(client, logger);
  periodAnalysis(client, logger);

  router.get('/projects', async (res: Response) => {
    try {
      const projects = await fetchProjects(client, logger);
      res.json(projects.filter(result => result !== null));
    } catch (error) {
      logger.error('Error obteniendo datos de SonarCloud', error);
      res.status(500).send('Error obteniendo datos de SonarCloud');
    }
  });

  router.get('/projectsdb', async (res: Response) => {
    try {
      const projects = await fetchAllProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error al recuperar proyectos:', error);
      res.status(500).send('Error al recuperar proyectos de la base de datos');
    }
  });

  router.get('/vulnerability7', async (res: Response) => {
    try {
      const vulnerabilities = await fetchLastSevenVulnerabilities();
      res.status(200).json({ message: 'Success', vulnerabilities });
    } catch (error) {
      console.error('Error al obtener las vulnerabilidades:', error);
      res
        .status(500)
        .json({
          message: 'Error al obtener las vulnerabilidades',
          error: error.message,
        });
    }
  });

  router.get('/events', eventFunction);

  router.post('/sonar-webhook', async (res: Response) => {
    await fetchAndStoreProjectData(client, logger);
    broadcastEvent(
      JSON.stringify({ message: 'Nuevo webhook recibido desde SonarCloud' }),
    );
    res.status(200).send('Webhook procesado correctamente');
  });

  router.use(errorHandler());
  return router;
}
