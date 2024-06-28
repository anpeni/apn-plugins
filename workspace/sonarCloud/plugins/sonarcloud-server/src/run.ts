import { getRootLogger } from '@backstage/backend-common'; // Importa la función para obtener el logger raíz
import yn from 'yn'; // Importa la librería yn para convertir valores booleanos
import { startStandaloneServer } from './service/standaloneServer'; // Importa la función para iniciar el servidor standalone

// Obtiene el puerto del servidor desde la variable de entorno PLUGIN_PORT o usa el puerto 7007 por defecto
const port = process.env.PLUGIN_PORT ? Number(process.env.PLUGIN_PORT) : 7007;
// Obtiene la configuración de CORS desde la variable de entorno PLUGIN_CORS o usa false por defecto
const enableCors = yn(process.env.PLUGIN_CORS, { default: false });
// Obtiene el logger raíz para registrar eventos y errores
const logger = getRootLogger();

// Inicia el servidor standalone con las opciones configuradas
startStandaloneServer({ port, enableCors, logger })
  .then(() => {
    logger.info(`Servidor sonarcloud iniciado con éxito en el puerto ${port}`); // Log de éxito al iniciar el servidor
  })
  .catch(err => {
    logger.error(err); // Log de error si falla al iniciar el servidor
    process.exit(1); // Salida del proceso con código de error
  });

// Manejo de la señal SIGINT (Ctrl+C) para salir de manera segura
process.on('SIGINT', () => {
  logger.info('CTRL+C pressed; exiting.'); // Log de información al presionar Ctrl+C
  process.exit(0); // Salida del proceso con código de éxito
});