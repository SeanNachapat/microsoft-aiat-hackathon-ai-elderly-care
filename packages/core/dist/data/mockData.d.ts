export declare const MOCK_DATA: {
    primaryPatient: {
        id: string;
        name: string;
        fullName: string;
        age: number;
        bloodType: string;
        weight: string;
        status: string;
        lastActive: string;
        location: string;
        vitals: {
            heartRate: number;
            spo2: number;
            temperature: number;
            bloodPressure: string;
        };
        sensors: {
            roomTemp: number;
            motion: string;
            door: string;
            humidity: number;
            activityScore: number;
            analyzedInsights: string;
        };
        medications: ({
            id: number;
            name: string;
            time: string;
            status: string;
            takenAt: string;
            dueIn?: undefined;
        } | {
            id: number;
            name: string;
            time: string;
            status: string;
            dueIn: string;
            takenAt?: undefined;
        } | {
            id: number;
            name: string;
            time: string;
            status: string;
            takenAt?: undefined;
            dueIn?: undefined;
        })[];
        careTeam: {
            id: string;
            name: string;
            role: string;
            specialty: string;
            image: string;
        }[];
        emergencyContacts: {
            name: string;
            phone: string;
            relation: string;
        }[];
        devices: {
            id: string;
            name: string;
            status: string;
        }[];
    };
    alerts: {
        id: string;
        patientName: string;
        type: string;
        severity: string;
        time: string;
    }[];
    allPatients: {
        id: string;
        name: string;
        status: string;
        hr: number;
        o2: number;
    }[];
    systemHealth: {
        network: string;
        aiModels: string;
        iotGateway: string;
    };
};
//# sourceMappingURL=mockData.d.ts.map