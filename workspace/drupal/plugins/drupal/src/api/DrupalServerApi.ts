import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

/** @public */
export const drupalApiRef = createApiRef<DrupalApi>({
  id: 'plugin.drupal.service',
});

/** @public */
export class DrupalApi {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  async getTable(tableName: string): Promise<any> {
    const apiUrl = await this.getApiUrl();
    const response = await fetch(`${apiUrl}/${encodeURIComponent(tableName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.statusText}`);
    }

    return response.json();
  }

  private async getApiUrl(): Promise<string> {
    return this.discoveryApi.getBaseUrl('drupal-backend');
  }
}
