import { LoggerService } from '@backstage/backend-plugin-api';
import { EventClient } from './EventClient';

export class EventService {
  private clients: EventClient[] = [];
  private readonly logger: LoggerService;
  private readonly pingInterval: number;

  constructor(logger: LoggerService, pingInterval: number = 30000) {
    this.logger = logger;
    this.pingInterval = pingInterval;
  }

  addClient(client: EventClient) {
    this.clients.push(client);
    this.startPingInterval(client);
  }

  removeClient(client: EventClient) {
    this.clients = this.clients.filter(c => c !== client);
  }

  sendEventToAllClients(data: any) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach(client => {
      try {
        client.write(message);
      } catch (error) {
        client.end();
        console.log(error);
        this.removeClient(client);
      }
    });
  }

  startPingInterval(client: EventClient) {
    const pingInterval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString();
      const pingMessage = `data: ping: ${formattedDate}\n\n`;
      try {
        client.write(pingMessage);
        this.logger.info(
          `Sending ping to client: ${client.req?.ip} with message: ${pingMessage}`,
        );
      } catch (error) {
        this.logger.error(
          `Error sending ping to client: ${client.req?.ip}`,
          error,
        );
        clearInterval(pingInterval);
        this.removeClient(client);
      }
    }, this.pingInterval);

    client.on('close', () => {
      clearInterval(pingInterval);
      this.removeClient(client);
      this.logger.debug(`Client disconnected: ${client.req?.ip}`);
    });
  }
}
