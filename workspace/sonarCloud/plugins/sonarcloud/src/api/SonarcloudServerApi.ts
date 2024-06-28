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
// Importaciones necesarias de Backstage para la creación de referencias de API y para interactuar con APIs de descubrimiento e identidad
import { createApiRef, DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';

/**
 * Clase SonarcloudApi para interactuar con la API de Sonarcloud.
 * Utiliza las APIs de descubrimiento e identidad para configurar y autenticar las peticiones.
 */
export class SonarcloudApi {
  discoveryApi: DiscoveryApi;
  identityApi: IdentityApi;

  /**
   * Constructor de la clase.
   * @param options Objeto que incluye las dependencias necesarias para la clase, específicamente las APIs de descubrimiento e identidad.
   */
  constructor(options: {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.identityApi = options.identityApi;
  }

  /**
   * Método para obtener datos de la API de Sonarcloud.
   * Realiza una petición GET a la API y devuelve una promesa con los datos obtenidos.
   */
  async getData() {
    const apiUrl = await this.getApiUrl(); // Obtiene la URL base de la API de Sonarcloud
    const response = await fetch(`${apiUrl}/projectsdb`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Manejo de respuestas no exitosas
    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.statusText}`);
    }

    return response.json(); // Devuelve la respuesta como JSON
  }

  async getVulnerability7() {
    const apiUrl = await this.getApiUrl(); // Obtiene la URL base de la API de Sonarcloud
    const response = await fetch(`${apiUrl}/vulnerability7`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Manejo de respuestas no exitosas
    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.statusText}`);
    }

    return response.json(); // Devuelve la respuesta como JSON
  }

  /**
   * Método privado para obtener la URL base de la API de Sonarcloud.
   */
  private async getApiUrl() {
    const sonarcloudServerUrl = await this.discoveryApi.getBaseUrl('sonarcloud-server');
    return sonarcloudServerUrl;
  }
}

/**
 * Referencia a la API de SonarcloudApi para ser utilizada por otros componentes y plugins.
 * Permite una integración estandarizada y fácil acceso a la funcionalidad proporcionada por la API.
 * @public
 */
export const sonarcloudApiRef = createApiRef<SonarcloudApi>({
  id: 'plugin.sonarcloud.service',
});