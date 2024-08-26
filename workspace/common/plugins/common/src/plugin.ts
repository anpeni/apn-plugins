import { createPlugin, createRouteRef } from '@backstage/core-plugin-api';

export const commonRouteRef = createRouteRef({
  id: 'common',
});

/** @public */
export const commonPlugin = createPlugin({
  id: 'common',
  routes: {
    common: commonRouteRef,
  },
});