import type { Patient } from '../models/patient';
export declare const mockPatients: Patient[];
export declare let patientsStore: Patient[];
export declare const getPatientById: (id: string) => Patient | undefined;
export declare const updatePatientVitals: (id: string, vitals: Partial<Patient["detail"]["vitals"]>) => Patient | undefined;
//# sourceMappingURL=patients.d.ts.map