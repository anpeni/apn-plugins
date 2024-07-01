import express, { Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { errorHandler, loadBackendConfig } from '@backstage/backend-common';
import { DrupalClient } from '../api/drupalApiClient';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const config = await loadBackendConfig({ logger, argv: process.argv });
  const router = Router();

  const drupalBaseUrl = config.getString('drupal.baseUrl');
  const client = new DrupalClient(drupalBaseUrl);

  router.get('/content', async (res: Response) => {
    try {
      const content = await client.getContent();
      res.json(content);
    } catch (error) {
      logger.error('Error obteniendo datos de Drupal', error);
      res.status(500).send('Error obteniendo datos de Drupal');
    }
  });

  router.use(errorHandler());
  return router;
}
