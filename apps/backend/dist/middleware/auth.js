"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
const env_1 = require("../config/env");
// ─── API Key Middleware ────────────────────────────────────────────────────────
// Checks for `x-api-key` header on all /api/* routes.
// Public routes (health, docs) are excluded.
const PUBLIC_PATHS = ['/api/health', '/api/docs'];
const apiKeyAuth = (req, res, next) => {
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
    if (key !== env_1.env.API_KEY) {
        res.status(403).json({
            error: 'Forbidden',
            message: 'Invalid API key',
        });
        return;
    }
    next();
};
exports.apiKeyAuth = apiKeyAuth;
//# sourceMappingURL=auth.js.map