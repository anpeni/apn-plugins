import { getRootLogger } from '@backstage/backend-common';

// import { startStandaloneServer } from './service/standaloneServer';


const logger = getRootLogger();

//const config = new ConfigReader({});

// startStandaloneServer({ port, enableCors, logger })
//   .then(() => {
//     logger.info(`Servidor Oracle con éxito en el puerto ${port}`);
//     // Puedes añadir más lógica aquí si es necesario
//   })
//   .catch(err => {
//     logger.error(err);
//     process.exit(1);
//   });

process.on('SIGINT', () => {
  logger.info('CTRL+C pressed; exiting.');
  process.exit(0);
});
