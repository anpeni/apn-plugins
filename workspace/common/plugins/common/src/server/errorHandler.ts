import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  console.error(err.stack);
  res.status(500).send('Internal Error!');
};
