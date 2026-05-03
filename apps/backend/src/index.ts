import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';

import { env } from './config/env';
import { apiKeyAuth } from './middleware/auth';
import { errorHandler, notFound } from './middleware/errorHandler';
import logger from './middleware/logger';

import patientsRouter from './routes/patients';
import alertsRouter from './routes/alerts';
import devicesRouter from './routes/devices';
import aiRouter from './routes/ai';
import pdpaRouter from './routes/pdpa';
import reportsRouter from './routes/reports';

import { startSimulator } from './mock/simulators';

// ─── App Bootstrap ─────────────────────────────────────────────────────────────

const app = express();
const httpServer = http.createServer(app);

// ─── Socket.IO ────────────────────────────────────────────────────────────────

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST'],
  },
  path: '/ws',
});

io.on('connection', (socket) => {
  logger.info(`🔌 Client connected: ${socket.id}`);

  socket.emit('system:connected', {
    message: 'Connected to Healthcare 4 Elder — AI Elderly Care Backend',
    mockMode: env.MOCK_MODE,
    timestamp: new Date().toISOString(),
  });

  socket.on('subscribe:patient', (patientId: string) => {
    socket.join(`patient:${patientId}`);
    logger.debug(`Socket ${socket.id} subscribed to patient:${patientId}`);
  });

  socket.on('unsubscribe:patient', (patientId: string) => {
    socket.leave(`patient:${patientId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`🔌 Client disconnected: ${socket.id}`);
  });
});

// ─── Express Middleware ────────────────────────────────────────────────────────

app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('dev', {
    stream: { write: (msg) => logger.http(msg.trim()) },
  })
);

// ─── Health Check (public — no API key required) ──────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Healthcare 4 Elder — Backend',
    version: '1.0.0',
    environment: env.NODE_ENV,
    mockMode: env.MOCK_MODE,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    endpoints: {
      patients: '/api/patients',
      alerts: '/api/alerts',
      devices: '/api/devices',
      ai: '/api/ai',
      pdpa: '/api/pdpa',
      reports: '/api/reports',
    },
    websocket: {
      path: '/ws',
      events: [
        'system:connected',
        'system:tick',
        'patient:vitals-update',
        'patient:alert-triggered',
        'device:status-change',
      ],
    },
  });
});

// ─── API Routes (protected by API key) ────────────────────────────────────────

app.use('/api', apiKeyAuth);
app.use('/api/patients', patientsRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/devices', devicesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/pdpa', pdpaRouter);
app.use('/api/reports', reportsRouter);

// ─── Error Handling ────────────────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────────────────────

httpServer.listen(env.PORT, () => {
  logger.info(`\n`);
  logger.info(`🏥 Healthcare 4 Elder — Backend Server`);
  logger.info(`🚀 Running on http://localhost:${env.PORT}`);
  logger.info(`📡 WebSocket at ws://localhost:${env.PORT}/ws`);
  logger.info(`🔑 API Key: ${env.API_KEY.slice(0, 8)}...`);
  logger.info(`🎭 Mock Mode: ${env.MOCK_MODE ? 'ON' : 'OFF'}`);
  logger.info(`\n`);
  logger.info('─── Available Endpoints ──────────────────────────────');
  logger.info(`  GET  http://localhost:${env.PORT}/api/health         (public)`);
  logger.info(`  GET  http://localhost:${env.PORT}/api/patients       (x-api-key)`);
  logger.info(`  GET  http://localhost:${env.PORT}/api/alerts         (x-api-key)`);
  logger.info(`  GET  http://localhost:${env.PORT}/api/devices        (x-api-key)`);
  logger.info(`  POST http://localhost:${env.PORT}/api/ai/analyze-vitals`);
  logger.info(`  POST http://localhost:${env.PORT}/api/ai/chat`);
  logger.info(`  GET  http://localhost:${env.PORT}/api/pdpa           (x-api-key)`);
  logger.info(`  POST http://localhost:${env.PORT}/api/reports/generate`);
  logger.info('──────────────────────────────────────────────────────');

  if (env.MOCK_MODE) {
    logger.info(`\n🔬 Starting IoT simulator (every ${env.SIMULATION_INTERVAL_MS}ms)...`);
    startSimulator(io, env.SIMULATION_INTERVAL_MS);
  }
});

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────

const shutdown = (signal: string) => {
  logger.info(`\n${signal} received — shutting down gracefully...`);
  io.close();
  httpServer.close(() => {
    logger.info('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export { app, io };
