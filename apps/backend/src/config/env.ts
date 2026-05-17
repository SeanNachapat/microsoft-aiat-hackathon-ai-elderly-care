import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the backend workspace root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Override/add variables from .env.local (Azure keys)
dotenv.config({ path: path.resolve(__dirname, '../../../elderly-dashboard/.env.local') });

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_KEY: z.string().min(8).default('dev-secret-key-change-in-production'),
  MOCK_MODE: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
  SIMULATION_INTERVAL_MS: z.coerce.number().default(5000),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000,http://localhost:3001,http://localhost:3002')
    .transform((v) => v.split(',').map((s) => s.trim())),
  GOOGLE_AI_API_KEY: z.string().optional(),
  AZURE_SPEECH_KEY: z.string().optional(),
  AZURE_SPEECH_REGION: z.string().optional(),
  AZURE_OPENAI_ENDPOINT: z.string().url().optional(),
  AZURE_OPENAI_API_KEY: z.string().optional(),
  AZURE_OPENAI_DEPLOYMENT: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
