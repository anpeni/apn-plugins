import { drupalApiRef, DrupalApi } from './api';
import { drupalRouteRef } from './route-refs';
import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

export const drupalPlugin = createPlugin({
  id: 'drupal',
  apis: [
    createApiFactory({
      api: drupalApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new DrupalApi({ discoveryApi }),
    }),
  ],
});

export const DrupalContent = drupalPlugin.provide(
  createRoutableExtension({
    name: 'DrupalContent',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: drupalRouteRef,
  }),
);
