"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = require("../mock/patients");
const router = (0, express_1.Router)();
// ─── GET /api/pdpa ────────────────────────────────────────────────────────────
// System-wide PDPA consent summary
router.get('/', (_req, res) => {
    const summary = patients_1.patientsStore.map((p) => ({
        patientId: p.id,
        patientName: p.name,
        consents: p.detail.consents,
        fullConsent: p.detail.consents.every((c) => c.status),
        consentVersion: 'v2.1',
    }));
    res.json({
        success: true,
        data: summary,
        stats: {
            fullConsent: summary.filter((s) => s.fullConsent).length,
            partialConsent: summary.filter((s) => !s.fullConsent).length,
            total: summary.length,
        },
    });
});
// ─── GET /api/pdpa/:patientId ─────────────────────────────────────────────────
router.get('/:patientId', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.patientId);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.patientId} not found` });
        return;
    }
    res.json({
        success: true,
        patientId: patient.id,
        patientName: patient.name,
        data: patient.detail.consents,
        consentVersion: 'v2.1',
        lastUpdated: '2026-01-05T00:00:00Z',
    });
});
// ─── PUT /api/pdpa/:patientId ─────────────────────────────────────────────────
// Body: { consents: [{ label: string, status: boolean }] }
router.put('/:patientId', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.patientId);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.patientId} not found` });
        return;
    }
    const { consents } = req.body;
    if (!Array.isArray(consents)) {
        res.status(400).json({ success: false, error: 'consents must be an array' });
        return;
    }
    // Merge updates into existing consents
    consents.forEach((update) => {
        const existing = patient.detail.consents.find((c) => c.label === update.label);
        if (existing) {
            existing.status = update.status;
            existing.updatedAt = new Date().toISOString();
        }
        else {
            patient.detail.consents.push({
                label: update.label,
                status: update.status,
                updatedAt: new Date().toISOString(),
            });
        }
    });
    res.json({
        success: true,
        message: 'PDPA consents updated',
        patientId: patient.id,
        data: patient.detail.consents,
    });
});
exports.default = router;
//# sourceMappingURL=pdpa.js.map