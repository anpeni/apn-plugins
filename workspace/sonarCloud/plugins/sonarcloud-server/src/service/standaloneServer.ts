/*
 * Copyright 2021 The Backstage Authors
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

/*
 * Derechos de autor 2021 Los autores de Backstage
 *
 * Licenciado bajo la Licencia Apache, Versión 2.0 (la "Licencia");
 * no puedes usar este archivo excepto en cumplimiento con la Licencia.
 * Puedes obtener una copia de la Licencia en
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * A menos que la ley aplicable lo requiera o los acuerdos estén por escrito, el software
 * distribuido bajo la Licencia se distribuye "TAL CUAL",
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ya sean expresas o implícitas.
 * Vea la Licencia para el lenguaje específico que rige los permisos y
 * limitaciones bajo la Licencia.
 */

import { createServiceBuilder } from '@backstage/backend-common';
import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './routerServer';

// Definición de la interfaz para las opciones del servidor
export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: Logger;
}

// Función para iniciar un servidor independiente
export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'sonarcloud-server' });
  logger.debug('Iniciando el servidor de la aplicación...');
  
  // Crear el enrutador utilizando la configuración proporcionada
  const router = await createRouter({
    logger,
  });

  // Crear el servicio y configurar el puerto y el enrutador
  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/sonarcloud-server', router);
  
  // Habilitar CORS si está configurado
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  // Iniciar el servicio y manejar errores
  return await service.start()
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

// Aceptación de módulos calientes si están disponibles (útil para desarrollo)
module.hot?.accept();
