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

import { AzureRealtimeService } from './services/azureRealtime';
import { analyzeTurn } from './services/analyzeTurn';
import { evaluateActions } from './services/alertRouter';

const aiSessions = new Map<string, AzureRealtimeService>();

io.on('connection', (socket) => {
  logger.info(`🔌 Client connected: ${socket.id}`);

  socket.emit('system:connected', {
    message: 'Connected to Healthcare 4 Elder — AI Elderly Care Backend',
    mockMode: env.MOCK_MODE,
    timestamp: new Date().toISOString(),
  });

  // ─── Caregiver Room ───
  socket.on('caregiver:join', () => {
    socket.join('caregiver-panel');
    logger.info(`👩‍⚕️ Caregiver joined monitoring panel: ${socket.id}`);
  });

  // ─── Gemini Live Voice Handlers ───
  
  socket.on('voice:start', async (data: { systemInstruction: string }) => {
    try {
      const service = new AzureRealtimeService();
      aiSessions.set(socket.id, service);
      await service.startSession(socket, data.systemInstruction);
      // Notify caregivers that a session started
      io.to('caregiver-panel').emit('session:started', {
        socketId: socket.id,
        patientId: 'AEC-001847',
        patientName: 'Somsri',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      logger.error(`Voice start failed: ${err}`);
      socket.emit('voice:error', 'Voice service unavailable');
    }
  });

  socket.on('voice:audio', (base64Audio: string) => {
    const service = aiSessions.get(socket.id);
    if (service) {
      service.sendAudio(base64Audio);
    }
  });

  // ─── Turn Analysis Pipeline ───
  socket.on('voice:transcript', async (data: { text: string; speaker: 'elder' | 'ai' }) => {
    // Push transcript to caregiver panel
    io.to('caregiver-panel').emit('transcript:new', {
      speaker: data.speaker,
      text: data.text,
      timestamp: new Date().toISOString()
    });

    // Only analyze elder speech (not AI responses)
    if (data.speaker === 'elder') {
      try {
        const analysis = await analyzeTurn(data.text);
        // Push analysis to caregiver panel
        io.to('caregiver-panel').emit('analysis:new', analysis);
        // Evaluate and auto-trigger actions
        evaluateActions(analysis, (action, payload) => {
          io.to('caregiver-panel').emit(action, payload);
        });
      } catch (err) {
        logger.error(`Analysis pipeline error: ${err}`);
      }
    }
  });

  socket.on('voice:stop', () => {
    const service = aiSessions.get(socket.id);
    if (service) {
      service.stopSession();
      aiSessions.delete(socket.id);
    }
    io.to('caregiver-panel').emit('session:ended', {
      socketId: socket.id,
      timestamp: new Date().toISOString()
    });
  });

  // ─── Patient Subscriptions ───

  socket.on('subscribe:patient', (patientId: string) => {
    socket.join(`patient:${patientId}`);
    logger.debug(`Socket ${socket.id} subscribed to patient:${patientId}`);
  });

  socket.on('unsubscribe:patient', (patientId: string) => {
    socket.leave(`patient:${patientId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`🔌 Client disconnected: ${socket.id}`);
    const service = aiSessions.get(socket.id);
    if (service) {
      service.stopSession();
      aiSessions.delete(socket.id);
    }
    io.to('caregiver-panel').emit('session:ended', {
      socketId: socket.id,
      timestamp: new Date().toISOString()
    });
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

// ─── SOS HTTP Fallback (public — no API key, always available) ────────────────

app.post('/api/sos', (req, res) => {
  const { patientId } = req.body || {};
  logger.warn(`🚨🚨🚨 SOS TRIGGERED via HTTP fallback for patient: ${patientId || 'unknown'}`);
  
  // Broadcast to all caregiver panels
  io.to('caregiver-panel').emit('action:sos', {
    type: 'sos',
    priority: 'critical',
    trigger: 'manual',
    message: `SOS button pressed by patient ${patientId}`,
    timestamp: new Date().toISOString()
  });

  res.json({ status: 'sos_triggered', timestamp: new Date().toISOString() });
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
