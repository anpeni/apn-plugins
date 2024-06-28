import fetch, { RequestInit, Response } from 'node-fetch';

// Definición de la interfaz Measure para representar las medidas de SonarQube
interface Measure {
  metric: string;
  value: string;
  bestValue?: boolean;
  periods?: Array<{ index: number; value: string; bestValue?: boolean }>;
}

// Definición de la interfaz Project para representar los proyectos de SonarQube
interface Project {
  id: string;
  key: string;
  name: string;
  qualifier: string;
  measures: Measure[];
}

// Definición de la interfaz ProjectSearchResult para los resultados de búsqueda de proyectos
interface ProjectSearchResult {
  components: Project[];
}

// Definición de la interfaz MeasureResult para los resultados de medidas de un proyecto
interface MeasureResult {
  component: {
    id: string;
    key: string;
    name: string;
    qualifier: string;
    measures: Measure[];
  };
}

// Definición de la clase SonarCloudClient para interactuar con la API de SonarCloud
export class SonarCloudClient {
  private baseURL: string;
  private token: string;
  private organization: string;

  /**
   * Constructor de la clase SonarCloudClient
   * @param baseURL - URL base de la API de SonarCloud
   * @param token - Token de autenticación
   * @param organization - Organización de SonarCloud
   */
  constructor(baseURL: string, token: string, organization: string) {
    this.baseURL = baseURL;
    this.token = token;
    this.organization = organization;
  }

  /**
   * Método privado para realizar peticiones a la API
   * @param endpoint - Endpoint de la API
   * @param options - Opciones de la petición
   * @returns Promesa con los datos de la respuesta
   */
  private async fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const base64Auth = Buffer.from(`${this.token}:`).toString('base64');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Auth}`,
    };

    // Realiza la petición utilizando fetch
    const response: Response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    // Manejo de errores en la respuesta
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${JSON.stringify(errorDetails)}`);
    }

    return response.json(); // Devuelve la respuesta como JSON
  }

  /**
   * Método para obtener la lista de proyectos de SonarCloud
   * @returns Promesa con los resultados de búsqueda de proyectos
   */
  async getProjects(): Promise<ProjectSearchResult> {
    return this.fetchAPI(`/api/projects/search?organization=${this.organization}`);
  }

  /**
   * Método para obtener las medidas de un proyecto específico
   * @param projectKey - Clave del proyecto
   * @param metrics - Métricas a obtener
   * @returns Promesa con los resultados de las medidas del proyecto
   */
  async getProjectMeasures(projectKey: string, metrics: string): Promise<MeasureResult> {
    return this.fetchAPI(`/api/measures/component?component=${projectKey}&metricKeys=${metrics}`);
  }
}
