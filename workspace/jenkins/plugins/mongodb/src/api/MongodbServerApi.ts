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
import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

/** @public */
export const mongodbApiRef = createApiRef<MongodbApi>({
  id: 'plugin.mongodb.service',
});

/** @public */
export class MongodbApi {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: {
    discoveryApi: DiscoveryApi;
  }) {
    this.discoveryApi = options.discoveryApi;

  }

  async getData(parameter: string, type: string, databasename: string) {
    const apiUrl = await this.getApiUrl(databasename);
    const response = await fetch(`${apiUrl}/${type}?parameter=${encodeURIComponent(parameter)}`, {
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

  async getProcedures(databasename: string) {
    const apiUrl = await this.getApiUrl(databasename);
    //console.info('apiUrl', apiUrl);
    const response = await fetch(`${apiUrl}/procedures`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener procedimientos: ${response.statusText}`);
    }

    return response.json();
  }

  async execProcedures(procedureName: string, databasename: string) {
    const apiUrl = await this.getApiUrl(databasename);
    const response = await fetch(`${apiUrl}/execute/${encodeURIComponent(procedureName)}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error al ejecutar procedimiento: ${response.statusText}`);
    }
  
    return response.json();
  }

  private async getApiUrl(databasename: string) {
    const mongodbServerUrl = await this.discoveryApi.getBaseUrl(databasename);
    return mongodbServerUrl;
  }
}

