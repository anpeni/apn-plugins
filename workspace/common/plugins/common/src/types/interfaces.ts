import express from 'express';
import { LoggerService } from '@backstage/backend-plugin-api';

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  baseUrl: string;
  createRouter: (options: { logger: LoggerService }) => Promise<express.Router>;
}

export interface IApplicationService {
  getProjectData(): Promise<any>;
}
