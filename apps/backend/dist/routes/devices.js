"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = require("../mock/patients");
const router = (0, express_1.Router)();
// ─── GET /api/devices ─────────────────────────────────────────────────────────
// Returns all IoT devices across all patients
router.get('/', (_req, res) => {
    const allDevices = patients_1.patientsStore.flatMap((p) => p.detail.devices.map((d) => ({ ...d, patientName: p.name })));
    res.json({
        success: true,
        count: allDevices.length,
        onlineCount: allDevices.filter((d) => d.online).length,
        data: allDevices,
    });
});
// ─── GET /api/devices/:patientId ──────────────────────────────────────────────
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
        count: patient.detail.devices.length,
        data: patient.detail.devices,
    });
});
exports.default = router;
//# sourceMappingURL=devices.js.map