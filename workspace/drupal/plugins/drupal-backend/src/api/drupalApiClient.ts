import fetch, { Response } from 'node-fetch';

export interface Content {
  articulo: string;
  type: string;
  uid: string;
  status: string;
  created: string;
}

export class DrupalClient {
  constructor(private readonly baseURL: string) {}

  private async fetchAPI(endpoint: string): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const response: Response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getContent(): Promise<Content[]> {
    return this.fetchAPI(`/api/v1/articulos`);
  }
}
