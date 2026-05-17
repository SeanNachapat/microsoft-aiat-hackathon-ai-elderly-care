"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const logger_1 = __importDefault(require("./logger"));
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'Internal Server Error';
    logger_1.default.error(`${req.method} ${req.path} → ${statusCode}: ${message}`, {
        stack: err.stack,
        code: err.code,
    });
    res.status(statusCode).json({
        error: err.name ?? 'Error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    });
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map