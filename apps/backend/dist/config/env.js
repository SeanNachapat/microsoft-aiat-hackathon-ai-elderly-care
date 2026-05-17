"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from the backend workspace root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Override/add variables from .env.local (Azure keys)
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../elderly-dashboard/.env.local') });
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(4000),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    API_KEY: zod_1.z.string().min(8).default('dev-secret-key-change-in-production'),
    MOCK_MODE: zod_1.z
        .string()
        .transform((v) => v === 'true')
        .default('true'),
    SIMULATION_INTERVAL_MS: zod_1.z.coerce.number().default(5000),
    CORS_ORIGINS: zod_1.z
        .string()
        .default('http://localhost:3000,http://localhost:3001,http://localhost:3002')
        .transform((v) => v.split(',').map((s) => s.trim())),
    GOOGLE_AI_API_KEY: zod_1.z.string().optional(),
    AZURE_SPEECH_KEY: zod_1.z.string().optional(),
    AZURE_SPEECH_REGION: zod_1.z.string().optional(),
    AZURE_OPENAI_ENDPOINT: zod_1.z.string().url().optional(),
    AZURE_OPENAI_API_KEY: zod_1.z.string().optional(),
    AZURE_OPENAI_DEPLOYMENT: zod_1.z.string().optional(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.format());
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map