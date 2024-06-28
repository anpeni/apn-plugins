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

import { oracleApiRef, OracleApi } from './api';
import { oracleRouteRef } from './route-refs';
import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

/** @public */
export const oraclePlugin = createPlugin({
  id: 'oracle',
  apis: [
    createApiFactory({
      api: oracleApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new OracleApi({ discoveryApi }),
    }),
  ],
});

/** @public */
export const OracleContent = oraclePlugin.provide(
  createRoutableExtension({
    name: 'OracleContent',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: oracleRouteRef,
  }),
);
