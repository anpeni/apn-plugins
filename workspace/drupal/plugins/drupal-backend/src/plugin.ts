import { loggerToWinstonLogger } from '@backstage/backend-common';
import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/routerServer';

export const drupalBackendPlugin = createBackendPlugin({
  pluginId: 'drupal-backend',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
      },
      async init({ logger, httpRouter }) {
        httpRouter.use(
          await createRouter({
            logger: loggerToWinstonLogger(logger),
          }),
        );
      },
    });
  },
});
