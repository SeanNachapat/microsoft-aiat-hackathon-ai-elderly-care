import type { Request, Response, NextFunction } from 'express';
import logger from './logger';

// ─── Global Error Handler ─────────────────────────────────────────────────────

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Internal Server Error';

  logger.error(`${req.method} ${req.path} → ${statusCode}: ${message}`, {
    stack: err.stack,
    code: err.code,
  });

  res.status(statusCode).json({
    error: err.name ?? 'Error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
};
