# Economic Topic API (server)

This document describes the backend endpoints implemented under `/api/v1/brand/economic`.

## Endpoints

### GET /api/v1/brand/economic/
- Auth required (brand)
- Returns the stored `Economic` document for the authenticated brand (creates a default if none).

### POST /api/v1/brand/economic/
- Auth required (brand)
- Accepts either a GRI setup payload (sections + totalSelected) or a topic assessment (selectedImpacts + thresholds + isCompleted)
- Validated with Joi; returns upserted document

## Model
See `server/models/Economic.js` for Mongoose schema.

## Notes
- Authentication middleware must populate `req.user.brandId` before these routes.
- Add route to Express app: `app.use('/api/v1/brand/economic', require('./routes/economic'))`
