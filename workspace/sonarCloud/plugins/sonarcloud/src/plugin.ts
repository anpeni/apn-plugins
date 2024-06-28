/*
 * Copyright 2020 The Backstage Authors
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

import { sonarcloudApiRef, SonarcloudApi } from './api';
import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';

/** @public */
export const sonarcloudPlugin = createPlugin({
  id: 'sonarcloud-front', // Identificador único para el plugin
  apis: [
    createApiFactory({
      api: sonarcloudApiRef, // Referencia a la API de Sonarcloud que se exportará
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef, }, // Dependencias de APIs necesarias para la fábrica de la API
      factory: ({ discoveryApi, identityApi }) => new SonarcloudApi({ discoveryApi, identityApi }), // Función de fábrica que crea una instancia de SonarcloudApi con las dependencias inyectadas
    }),
  ],
});



