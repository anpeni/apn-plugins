import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import mongoose from 'mongoose';
import { errorHandler, loadBackendConfig } from '@backstage/backend-common';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.info('Initializing mongodb-SERVER Backend');
  const router = Router();
  router.use(express.json());

  const UserSchema = new mongoose.Schema({}, { strict: false });

  router.get('/users', async (req: Request, res: Response) => {
    const mongoServer = config.getString('mongodb.server');
    const mongoUser = config.getString('mongodb.user');
    const mongoPass = config.getString('mongodb.password');
    const mongoDatabase = config.getString('mongodb.database');
    const mongoUri = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDatabase}`;

    try {
      await mongoose.connect(mongoUri);
      logger.info('Connected to MongoDB');

      const parameter = req.query.parameter;
      if (typeof parameter !== 'string' || !parameter) {
        return res.status(400).send('Table name is required');
      }

      const AnyModel = mongoose.model('Any', UserSchema, parameter);
      const users = await AnyModel.find({});
      const columnNames = new Set<string>();

      users.forEach(user => {
        Object.keys(user.toObject()).forEach(key => {
          columnNames.add(key);
        });
      });

      const schemaInfo = Array.from(columnNames).map(key => ({
        COLUMN_NAME: key,
        DATA_TYPE: 'STRING',
      }));

      res.json({
        schema: schemaInfo,
        data: users,
      });
    } catch (err) {
      logger.error(`Error connecting to or querying MongoDB: ${err.message}`);
      res.status(500).send(err.message);
      return;
    } finally {
      mongoose.connection
        .close()
        .then(() => logger.info('MongoDB connection closed'));
      return;
    }
  });

  router.use(errorHandler());
  return router;
}
