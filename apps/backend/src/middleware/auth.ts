import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

// ─── API Key Middleware ────────────────────────────────────────────────────────
// Checks for `x-api-key` header on all /api/* routes.
// Public routes (health, docs) are excluded.

const PUBLIC_PATHS = ['/api/health', '/api/docs'];

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Skip auth for public paths
  if (PUBLIC_PATHS.some((p) => req.path.startsWith(p))) {
    next();
    return;
  }

  const key = req.headers['x-api-key'];

  if (!key) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing x-api-key header',
    });
    return;
  }

  if (key !== env.API_KEY) {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid API key',
    });
    return;
  }

  next();
};
