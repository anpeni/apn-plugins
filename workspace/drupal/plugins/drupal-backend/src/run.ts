import { getRootLogger } from '@backstage/backend-common';
import { startStandaloneServer } from './service/standaloneServer';

const port = Number(process.env.PLUGIN_PORT) || 7007;
const logger = getRootLogger();

async function startServer() {
  try {
    await startStandaloneServer({ port, logger });
    logger.info(`Servidor Drupal iniciado con éxito en el puerto ${port}`);
  } catch (error) {
    logger.error('Error iniciando el servidor Drupal', error);
    process.exit(1);
  }

  process.on('SIGINT', () => {
    logger.info('CTRL+C pressed; exiting.');
    process.exit(0);
  });
}

startServer();
