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

import { sqlApiRef, SqlApi } from './api';
import { sqlRouteRef } from './route-refs';
import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

/** @public */
export const sqlPlugin = createPlugin({
  id: 'sql-server',
  apis: [
    createApiFactory({
      api: sqlApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new SqlApi({ discoveryApi }),
    }),
  ],
});

/** @public */
export const SqlContent = sqlPlugin.provide(
  createRoutableExtension({
    name: 'SqlContent',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: sqlRouteRef,
  }),
);
