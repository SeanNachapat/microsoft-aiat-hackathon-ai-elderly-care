# Healthcare 4 Elder Monorepo

Unified ecosystem for AI-driven elderly care.

## Structure

- `apps/`
  - `admin-dashboard`: Next.js admin portal (Port 3000)
  - `caregiver-dashboard`: Next.js caregiver portal (Port 3001)
  - `elderly-dashboard`: Next.js elderly self-service portal (Port 3002)
  - `backend`: Express server with Socket.IO & Mock AI (Port 4000)
- `packages/`
  - `core`: Shared TypeScript types, interfaces, and constants.

## Getting Started

1. `npm install` from root.
2. `npm run dev:backend` to start the server.
3. `npm run dev:admin`, `npm run dev:caregiver`, or `npm run dev:elderly` to start the dashboards.

## Production Readiness

- **Shared Types**: Use `@healthcare/core` for all model definitions.
- **Services**: All API calls should be encapsulated in `src/services`.
- **Components**: UI is separated into `src/components`.