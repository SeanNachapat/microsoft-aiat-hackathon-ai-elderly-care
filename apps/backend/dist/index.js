"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const auth_1 = require("./middleware/auth");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = __importDefault(require("./middleware/logger"));
const patients_1 = __importDefault(require("./routes/patients"));
const alerts_1 = __importDefault(require("./routes/alerts"));
const devices_1 = __importDefault(require("./routes/devices"));
const ai_1 = __importDefault(require("./routes/ai"));
const pdpa_1 = __importDefault(require("./routes/pdpa"));
const reports_1 = __importDefault(require("./routes/reports"));
const simulators_1 = require("./mock/simulators");
// ─── App Bootstrap ─────────────────────────────────────────────────────────────
const app = (0, express_1.default)();
exports.app = app;
const httpServer = http_1.default.createServer(app);
// ─── Socket.IO ────────────────────────────────────────────────────────────────
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: env_1.env.CORS_ORIGINS,
        methods: ['GET', 'POST'],
    },
    path: '/ws',
});
exports.io = io;
const azureRealtime_1 = require("./services/azureRealtime");
const analyzeTurn_1 = require("./services/analyzeTurn");
const alertRouter_1 = require("./services/alertRouter");
const aiSessions = new Map();
io.on('connection', (socket) => {
    logger_1.default.info(`🔌 Client connected: ${socket.id}`);
    socket.emit('system:connected', {
        message: 'Connected to Healthcare 4 Elder — AI Elderly Care Backend',
        mockMode: env_1.env.MOCK_MODE,
        timestamp: new Date().toISOString(),
    });
    // ─── Caregiver Room ───
    socket.on('caregiver:join', () => {
        socket.join('caregiver-panel');
        logger_1.default.info(`👩‍⚕️ Caregiver joined monitoring panel: ${socket.id}`);
    });
    // ─── Gemini Live Voice Handlers ───
    socket.on('voice:start', async (data) => {
        try {
            const service = new azureRealtime_1.AzureRealtimeService();
            aiSessions.set(socket.id, service);
            await service.startSession(socket, data.systemInstruction);
            // Notify caregivers that a session started
            io.to('caregiver-panel').emit('session:started', {
                socketId: socket.id,
                patientId: 'AEC-001847',
                patientName: 'Somsri',
                timestamp: new Date().toISOString()
            });
        }
        catch (err) {
            logger_1.default.error(`Voice start failed: ${err}`);
            socket.emit('voice:error', 'Voice service unavailable');
        }
    });
    socket.on('voice:audio', (base64Audio) => {
        const service = aiSessions.get(socket.id);
        if (service) {
            service.sendAudio(base64Audio);
        }
    });
    // ─── Turn Analysis Pipeline ───
    socket.on('voice:transcript', async (data) => {
        // Push transcript to caregiver panel
        io.to('caregiver-panel').emit('transcript:new', {
            speaker: data.speaker,
            text: data.text,
            timestamp: new Date().toISOString()
        });
        // Only analyze elder speech (not AI responses)
        if (data.speaker === 'elder') {
            try {
                const analysis = await (0, analyzeTurn_1.analyzeTurn)(data.text);
                // Push analysis to caregiver panel
                io.to('caregiver-panel').emit('analysis:new', analysis);
                // Evaluate and auto-trigger actions
                (0, alertRouter_1.evaluateActions)(analysis, (action, payload) => {
                    io.to('caregiver-panel').emit(action, payload);
                });
            }
            catch (err) {
                logger_1.default.error(`Analysis pipeline error: ${err}`);
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
    socket.on('subscribe:patient', (patientId) => {
        socket.join(`patient:${patientId}`);
        logger_1.default.debug(`Socket ${socket.id} subscribed to patient:${patientId}`);
    });
    socket.on('unsubscribe:patient', (patientId) => {
        socket.leave(`patient:${patientId}`);
    });
    socket.on('disconnect', () => {
        logger_1.default.info(`🔌 Client disconnected: ${socket.id}`);
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
app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGINS, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev', {
    stream: { write: (msg) => logger_1.default.http(msg.trim()) },
}));
// ─── Health Check (public — no API key required) ──────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'Healthcare 4 Elder — Backend',
        version: '1.0.0',
        environment: env_1.env.NODE_ENV,
        mockMode: env_1.env.MOCK_MODE,
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
    logger_1.default.warn(`🚨🚨🚨 SOS TRIGGERED via HTTP fallback for patient: ${patientId || 'unknown'}`);
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
// ─── LINE Bot Webhook (public — LINE platform needs to reach this) ────────────
app.post('/api/line/webhook', (req, res) => {
    const events = req.body?.events || [];
    if (events.length === 0) {
        // LINE webhook verification (empty events array)
        return res.status(200).json({ status: 'ok' });
    }
    for (const event of events) {
        const userId = event.source?.userId;
        // ✨ IMPORTANT: Log the User ID prominently so you can copy it to .env.local
        logger_1.default.info(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        logger_1.default.info(`📩 LINE Event: ${event.type}`);
        logger_1.default.info(`👤 LINE User ID: ${userId}`);
        logger_1.default.info(`   ↑ Copy this to LINE_CAREGIVER_USER_ID in .env.local`);
        logger_1.default.info(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
        if (event.type === 'follow') {
            // User just added/followed the bot
            logger_1.default.info(`🎉 New follower! User ID: ${userId}`);
        }
        if (event.type === 'message' && event.message?.type === 'text') {
            const caregiverText = event.message.text;
            logger_1.default.info(`💬 LINE message from caregiver: "${caregiverText}"`);
            // Forward caregiver's LINE reply to the dashboard
            io.to('caregiver-panel').emit('caregiver:line_message', {
                text: caregiverText,
                from: userId,
                timestamp: new Date().toISOString()
            });
        }
    }
    // LINE requires a 200 response
    res.status(200).json({ status: 'ok' });
});
// Simple health check for LINE webhook verification
app.get('/api/line/webhook', (_req, res) => {
    res.json({ status: 'LINE webhook active', timestamp: new Date().toISOString() });
});
// ─── API Routes (protected by API key) ────────────────────────────────────────
app.use('/api', auth_1.apiKeyAuth);
app.use('/api/patients', patients_1.default);
app.use('/api/alerts', alerts_1.default);
app.use('/api/devices', devices_1.default);
app.use('/api/ai', ai_1.default);
app.use('/api/pdpa', pdpa_1.default);
app.use('/api/reports', reports_1.default);
// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// ─── Start Server ──────────────────────────────────────────────────────────────
httpServer.listen(env_1.env.PORT, () => {
    logger_1.default.info(`\n`);
    logger_1.default.info(`🏥 Healthcare 4 Elder — Backend Server`);
    logger_1.default.info(`🚀 Running on http://localhost:${env_1.env.PORT}`);
    logger_1.default.info(`📡 WebSocket at ws://localhost:${env_1.env.PORT}/ws`);
    logger_1.default.info(`🔑 API Key: ${env_1.env.API_KEY.slice(0, 8)}...`);
    logger_1.default.info(`🎭 Mock Mode: ${env_1.env.MOCK_MODE ? 'ON' : 'OFF'}`);
    logger_1.default.info(`\n`);
    logger_1.default.info('─── Available Endpoints ──────────────────────────────');
    logger_1.default.info(`  GET  http://localhost:${env_1.env.PORT}/api/health         (public)`);
    logger_1.default.info(`  GET  http://localhost:${env_1.env.PORT}/api/patients       (x-api-key)`);
    logger_1.default.info(`  GET  http://localhost:${env_1.env.PORT}/api/alerts         (x-api-key)`);
    logger_1.default.info(`  GET  http://localhost:${env_1.env.PORT}/api/devices        (x-api-key)`);
    logger_1.default.info(`  POST http://localhost:${env_1.env.PORT}/api/ai/analyze-vitals`);
    logger_1.default.info(`  POST http://localhost:${env_1.env.PORT}/api/ai/chat`);
    logger_1.default.info(`  GET  http://localhost:${env_1.env.PORT}/api/pdpa           (x-api-key)`);
    logger_1.default.info(`  POST http://localhost:${env_1.env.PORT}/api/reports/generate`);
    logger_1.default.info('──────────────────────────────────────────────────────');
    if (env_1.env.MOCK_MODE) {
        logger_1.default.info(`\n🔬 Starting IoT simulator (every ${env_1.env.SIMULATION_INTERVAL_MS}ms)...`);
        (0, simulators_1.startSimulator)(io, env_1.env.SIMULATION_INTERVAL_MS);
    }
});
// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
const shutdown = (signal) => {
    logger_1.default.info(`\n${signal} received — shutting down gracefully...`);
    io.close();
    httpServer.close(() => {
        logger_1.default.info('✅ Server closed');
        process.exit(0);
    });
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
//# sourceMappingURL=index.js.map