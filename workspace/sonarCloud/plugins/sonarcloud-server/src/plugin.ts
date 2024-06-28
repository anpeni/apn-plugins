/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { loggerToWinstonLogger } from '@backstage/backend-common';
import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/routerServer';

/**
 * Plugin backend de sonarcloud-server
 *
 * @public
 */
export const sonarcloudServerPlugin = createBackendPlugin({
  pluginId: 'sonarcloud-server', // Identificador único del plugin
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger, // Dependencia del servicio de logger central
        httpRouter: coreServices.httpRouter, // Dependencia del servicio de enrutador HTTP central
      },
      async init({
        logger,
        httpRouter,
      }) {
        const winstonLogger = loggerToWinstonLogger(logger); // Convierte el logger a un logger de Winston
        httpRouter.use(
          await createRouter({
            logger: winstonLogger, // Pasa el logger de Winston al enrutador
          }),
        );
      },
    });
  },
});

