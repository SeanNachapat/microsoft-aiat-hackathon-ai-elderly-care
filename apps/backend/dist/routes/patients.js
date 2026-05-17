"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = require("../mock/patients");
const router = (0, express_1.Router)();
// ─── GET /api/patients ────────────────────────────────────────────────────────
// Returns summary list (no full detail) for dashboard patient cards
router.get('/', (_req, res) => {
    const summaries = patients_1.patientsStore.map(({ detail: _detail, ...summary }) => summary);
    res.json({
        success: true,
        count: summaries.length,
        data: summaries,
    });
});
// ─── GET /api/patients/:id ────────────────────────────────────────────────────
// Returns full patient data including vitals, alerts, devices, etc.
router.get('/:id', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.id);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.id} not found` });
        return;
    }
    res.json({ success: true, data: patient });
});
// ─── GET /api/patients/:id/vitals ─────────────────────────────────────────────
router.get('/:id/vitals', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.id);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.id} not found` });
        return;
    }
    res.json({
        success: true,
        data: {
            patientId: patient.id,
            vitals: patient.detail.vitals,
            timestamp: patient.lastUpdated,
        },
    });
});
// ─── GET /api/patients/:id/devices ────────────────────────────────────────────
router.get('/:id/devices', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.id);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.id} not found` });
        return;
    }
    res.json({ success: true, data: patient.detail.devices });
});
// ─── GET /api/patients/:id/timeline ───────────────────────────────────────────
router.get('/:id/timeline', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.id);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.id} not found` });
        return;
    }
    res.json({ success: true, data: patient.detail.events });
});
exports.default = router;
//# sourceMappingURL=patients.js.map