import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

/** @public */
export const commonApiRef = createApiRef<CommonApi>({
  id: 'plugin.common.service',
});

/** @public */
export class CommonApi {
    //@ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  async fetchAPINew(baseURL: string, endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      const errorDetails = await response.json();
  
      throw new Error(
        `Error: ${response.status} ${
          response.statusText
        }, Details: ${JSON.stringify(errorDetails)}`,
      );
    }
    return response.json();
  }

  
}
