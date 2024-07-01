import { createServiceBuilder } from '@backstage/backend-common';
import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './routerServer';

export interface ServerOptions {
  port: number;
  logger: Logger;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'drupal-backend' });

  const router = await createRouter({ logger });

  const service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/drupal-backend', router);

  try {
    return await service.start();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

module.hot?.accept();
