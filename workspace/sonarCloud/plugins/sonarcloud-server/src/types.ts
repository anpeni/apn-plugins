
import { Logger } from 'winston';
import { Request, Response } from 'express';

export interface RouterOptions {
    logger: Logger;
  }

  export interface Project {
    key: string;
    metrics: MeasureResult;
  }

  export interface Pool {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
  }
  
  export interface Client {
    res: Response;
    req?: Request;
    sendEvent: (data: string) => void;
  }
  
  export interface MeasureResult {
    component: {
      id: string;
      key: string;
      name: string;
      qualifier: string;
      measures: Measure[];
    };
  }
  
  export interface Measure {
    metric: string;
    value: string;
    bestValue?: boolean;
    periods?: Array<{ index: number; value: string; bestValue?: boolean }>;
  }

  