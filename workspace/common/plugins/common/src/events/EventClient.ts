import { Response } from 'express';

export class EventClient {
  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  write(data: string): void {
    this.response.write(data);
  }

  end(): void {
    this.response.end();
  }

  on(event: string, callback: () => void): void {
    this.response.on(event, callback);
  }

  get req() {
    return this.response.req;
  }
}
