import { API_BASE_URL } from '@healthcare/core';

export class ApiService {
  private static apiKey = 'dev-secret-key-change-in-production'; // Should come from env

  static async fetcher(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  static getPatients() {
    return this.fetcher('/patients');
  }

  static getPatient(id: string) {
    return this.fetcher(`/patients/${id}`);
  }

  static getAlerts() {
    return this.fetcher('/alerts');
  }
}
