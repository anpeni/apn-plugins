import { commonApiRef, CommonApi } from './api';
import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

export const commonPlugin = createPlugin({
  id: 'common',
  apis: [
    createApiFactory({
      api: commonApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new CommonApi({ discoveryApi }),
    }),
  ],
});


