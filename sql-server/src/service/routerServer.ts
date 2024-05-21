import { errorHandler, loadBackendConfig } from '@backstage/backend-common';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import * as sql from 'mssql';

/** @public */
export interface RouterOptions {
  logger: Logger;
}
export interface ConfigSql {
  driver?: string;
  user?: string;
  password?: string;
  server: string;
  port?: number;
  domain?: string;
  database?: string;
  connectionTimeout?: number;
  requestTimeout?: number;
  stream?: boolean;
  parseJSON?: boolean;
  options?: {
    encrypt?: boolean;
  };
  arrayRowMode?: boolean;
  authentication?: any;
}

/** @public */
export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.info('Initializing SQL-SERVER Backend');
  const router = Router();
  router.use(express.json());
  const configSql: ConfigSql = {
    user: config.getString('sqlServer.user'),
    password: config.getString('sqlServer.password'),
    server: config.getString('sqlServer.server'),
    port: config.get('sqlServer.port'),
    database: config.getString('sqlServer.database'),
    authentication: {
      type: 'default',
    },
    options: {
      encrypt: true,
    },
  };

  router.get('/users', async (req: Request, res: Response) => {
    let poolConnection;

    try {
      const parameter = req.query.parameter;
      if (typeof parameter !== 'string' || !parameter) {
        return res.status(400).send('Table name is required');
      }
      poolConnection = await sql.connect(configSql);
      const resultSet = await poolConnection
        .request()
        .query(`SELECT * FROM ${parameter};`);
      console.log(`${parameter} rows returned.`);
      const schema = await poolConnection.request()
        .query(`SELECT COLUMN_NAME, DATA_TYPE 
              FROM INFORMATION_SCHEMA.COLUMNS 
              WHERE TABLE_NAME = '${parameter}'`);
      res.json({
        schema: schema.recordset,
        data: resultSet.recordset,
      });
      return;
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send(err.message);
      return;
    } finally {
      if (poolConnection) {
        poolConnection.close();
      }
    }
});


router.get('/procedure-select', async (req: Request, res: Response) => {
  let poolConnection;

  try {
    const parameter = req.query.parameter;
    if (typeof parameter !== 'string' || !parameter) {
      return res.status(400).send('Table name is required');
    }

    poolConnection = await sql.connect(configSql);
    
    const result = await poolConnection
      .request()
      .execute(parameter);
      let data: string[] = [];
      let schema: string[] = [];
      if (Array.isArray(result.recordsets)) {
        data = result.recordsets[0];
        schema = result.recordsets[1];
      }

    res.json({
      schema: schema,
      data: data,
    });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
    return;
  } finally {
    if (poolConnection) {
      poolConnection.close();
    }
  }
});


router.get('/procedures', async (req: Request, res: Response) => {
  let poolConnection;
  try {
    poolConnection = await sql.connect(configSql);
    const result = await poolConnection
      .request()
      .query("SELECT name FROM sys.procedures;");
      console.log(`${result.recordset.length} rows returned.`);
    res.json(result.recordset);
  } catch (err: any) {
    console.error('SQL error', err);
    res.status(500).send(err.message);
  } finally {
    poolConnection?.close();
  }
});

router.get('/execute/:procedureName', async (req: Request, res: Response) => {
  let poolConnection;

  try {
    const { procedureName } = req.params;
    poolConnection = await sql.connect(configSql);
    const result = await poolConnection
      .request()
      .execute(procedureName); // Asumiendo que el procedimiento no requiere parámetros adicionales
    res.json(result.recordset);
  } catch (err: any) {
    console.error('SQL error', err);
    res.status(500).send(err.message);
  } finally {
    poolConnection?.close();
  }
});

  router.use(errorHandler());
  return router;
}
