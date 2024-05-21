import { errorHandler, loadBackendConfig } from '@backstage/backend-common';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import oracledb from 'oracledb';

/** @public */
export interface RouterOptions {
  logger: Logger;
}

export interface ConfigOracle {
  user: string;
  password: string;
  connectString: string;
  privilege?: number;
}

/** @public */
export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.info('****************************************');
  logger.info('********** Initializing ORACLE Backend **********');
  logger.info('****************************************');

  const router = Router();
  router.use(express.json());

  const configOracle: ConfigOracle = {
    user: config.getString('oracle.user'),
    password: config.getString('oracle.password'),
    connectString: config.getString('oracle.connectString'),
    privilege: oracledb.NORMAL,
  };

  router.get('/:tabla', async (req: Request, res: Response) => {
    let connection;

    try {
      connection = await oracledb.getConnection(configOracle);
      console.log('Reading rows from the Table...');

      const tabla = req.params.tabla.toUpperCase();

      const result = await connection.execute(`SELECT * FROM ${tabla}`);

      console.log(`${result.rows.length} rows returned.`);

      const schema = await connection.execute(
        `
        SELECT COLUMN_NAME, DATA_TYPE 
        FROM USER_TAB_COLUMNS 
        WHERE TABLE_NAME = :tabla
      `,
        { tabla },
      );

      res.json({
        schema: schema.rows,
        data: result.rows,
      });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send(err.message);
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  });

  router.use(errorHandler());
  return router;
}
