
import { Pool } from 'pg';
import { Measure, Project } from '../types'

// Configuración del pool de conexiones para la base de datos PostgreSQL.
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: 'backstage_plugin_sonarcloud-server',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : undefined,
});

/**
 * Establece la estructura inicial de la base de datos, creando las tablas necesarias si no existen.
 */
export async function setupDatabase() {
  // SQL para crear una tabla para proyectos individuales
  const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS metrics_summary (
      id SERIAL PRIMARY KEY,
      project_key VARCHAR(255) UNIQUE NOT NULL,
      data JSONB NOT NULL
    );
  `;

  // SQL para crear una tabla para registrar análisis de proyectos
  const createAnalysisRecordsTableQuery = `
    CREATE TABLE IF NOT EXISTS project_analysis_records (
      id SERIAL PRIMARY KEY,
      analysis_time TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
      data JSONB NOT NULL,
      vulnerabilities INTEGER DEFAULT 0
    );
  `;

  try {
    // Crear la tabla de proyectos
    await pool.query(createProjectsTableQuery);

    // Crear la tabla de análisis de proyectos
    await pool.query(createAnalysisRecordsTableQuery);
  } catch (error) {
    console.error('Error al crear las tablas en la base de datos', error);
    throw error;
  }
}

/**
 * Recupera todos los proyectos almacenados en la base de datos.
 */
export async function fetchAllProjects() {
  const queryText = 'SELECT project_key, data FROM metrics_summary;';

  try {
    const { rows } = await pool.query(queryText);
    const formattedProjects = rows.map(row => {
      const data = row.data;
      return {
        key: row.project_key,
        metrics: {
          component: {
            id: data.component.id,
            key: row.project_key,
            name: data.component.name,
            qualifier: data.component.qualifier,
            measures: data.component.measures.map((measure: Measure) => ({
              metric: measure.metric,
              value: measure.value,
              bestValue: measure.bestValue
            }))
          }
        }
      };
    });
    return formattedProjects;
  } catch (error) {
    console.error('Error al recuperar y formatear datos de la base de datos', error);
    throw error;
  }
}

/**
 * Actualiza el último análisis almacenado con nuevos datos de proyectos.updateLatestAnalysis
 */
/**
 * Actualiza el último análisis almacenado o inserta uno nuevo si la tabla está vacía.
 */
export async function updateLatestAnalysis(projectsData: Project[]) {
  const checkIfEmpty = `SELECT EXISTS (SELECT 1 FROM project_analysis_records LIMIT 1);`;
  const insertText = `
    INSERT INTO project_analysis_records (data, vulnerabilities, analysis_time)
    VALUES ($1, $2, NOW());
  `;
  const updateText = `
    UPDATE project_analysis_records
    SET data = $1, vulnerabilities = $2, analysis_time = NOW()
    WHERE id = (
      SELECT id FROM project_analysis_records
      ORDER BY analysis_time DESC
      LIMIT 1
    );
  `;

  try {
    let totalVulnerabilities = 0;
    const projectsArray = projectsData.map(project => {
      const metrics = project.metrics.component;
      return {
        key: project.key,
        name: metrics.name,
        measures: metrics.measures.reduce((acc: Record<string, any>, measure) => {
          acc[measure.metric] = {
            value: measure.value,
            bestValue: measure.bestValue
          };
          if (measure.metric === 'security_rating' && parseFloat(measure.value) > 1) {
            totalVulnerabilities++;
          }
          return acc;
        }, {})
      };
    });

    const result = await pool.query(checkIfEmpty);
    if (result.rows[0].exists) {
      // La tabla no está vacía, actualiza el último registro
      await pool.query(updateText, [JSON.stringify(projectsArray), totalVulnerabilities]);
    } else {
      // La tabla está vacía, inserta un nuevo registro
      await pool.query(insertText, [JSON.stringify(projectsArray), totalVulnerabilities]);
    }
  } catch (error) {
    console.error('Error al intentar actualizar o insertar el análisis de los proyectos', error);
    throw error;
  }
}



/**
 * Inserta o actualiza los datos de los proyectos en la base de datos.
 */
export async function insertProjectsData(projectsData: Project[]) {
  const queryText = 'INSERT INTO metrics_summary (project_key, data) VALUES ($1, $2) ON CONFLICT (project_key) DO UPDATE SET data = EXCLUDED.data';

  try {
    for (const project of projectsData) {
      await pool.query(queryText, [project.key, JSON.stringify(project.metrics)]);
    }
  } catch (error) {
    console.error('Error al insertar datos de proyectos en la base de datos', error);
    throw error;
  }
}

/**
 * Inserta un nuevo registro de análisis de proyectos en la base de datos.
 */
export async function insertAnalysis(projectsData: Project[]) {
  const queryText = `
      INSERT INTO project_analysis_records (data, vulnerabilities)
      VALUES ($1, $2);
  `;

  try {
    let totalVulnerabilities = 0;
    const projectsArray = projectsData.map(project => {
      const metrics = project.metrics.component;
      return {
        key: project.key,
        name: metrics.name,
        measures: metrics.measures.reduce((acc: Record<string, any>, measure) => {
          acc[measure.metric] = {
            value: measure.value,
            bestValue: measure.bestValue
          };
          if (measure.metric === 'security_rating' && parseFloat(measure.value) > 1) {
            totalVulnerabilities++;
          }
          return acc;
        }, {})
      };
    });

    await pool.query(queryText, [JSON.stringify(projectsArray), totalVulnerabilities]);
  } catch (error) {
    console.error('Error al insertar los datos de análisis de todos los proyectos', error);
    throw error;
  }
}

/**
 * Recupera las últimas siete entradas de vulnerabilidades de la base de datos.
 */
export async function fetchLastSevenVulnerabilities() {
  const queryText = `
      SELECT vulnerabilities
      FROM project_analysis_records
      WHERE analysis_time > NOW() - INTERVAL '48 hours'
      ORDER BY analysis_time DESC
      LIMIT 7;
  `;

  try {
    const { rows } = await pool.query(queryText);
    const vulnerabilitiesArray = rows.map(row => row.vulnerabilities);

    return vulnerabilitiesArray;
  } catch (error) {
    console.error('Error al extraer las vulnerabilidades', error);
    throw error;
  }
}

