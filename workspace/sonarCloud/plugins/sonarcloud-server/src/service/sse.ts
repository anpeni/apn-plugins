import { Request, Response } from 'express';


export interface Client {
    res: Response;
    req?: Request;
    sendEvent: (data: string) => void;
  }


  export const sendEvent = (client: Client, data: string) => {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    client.res.write(message);
  };
  
  export let clients: Client[] = [];
  
  // Función para enviar eventos a todos los clientes conectados
  export const broadcastEvent = (data: string) => {
    clients.forEach(client => client.sendEvent(data));
  };

  export const eventFunction = (req: Request, res: Response) => {


    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Content-Encoding': 'none',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    const client: Client = {
      res,
      sendEvent: (data: string) => sendEvent(client, data)
    };
    clients.push(client);

    req.on('close', () => {
      clients = clients.filter(c => c !== client);
      res.end();
    });
  }