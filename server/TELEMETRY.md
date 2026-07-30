# Live telemetry ingestion

StadiumSense AI accepts readings from a trusted CCTV analytics service, IoT gateway, or edge device at `POST /api/telemetry`.

Set `TELEMETRY_INGEST_KEY` on the API server, then send it only from that trusted service using the `x-telemetry-key` header. Never expose this key in the browser.

```http
POST /api/telemetry
Content-Type: application/json
x-telemetry-key: <TELEMETRY_INGEST_KEY>

{
  "crowdDensity": 72,
  "activeGate": "East Entrance",
  "parkingOccupied": 371,
  "parkingCapacity": 500,
  "temperature": 31.2,
  "securityAlerts": 0
}
```

Each accepted reading is persisted and emitted to authenticated dashboard clients through Socket.IO. Set `ENABLE_DEMO_TELEMETRY=false` for all real deployments; the optional demo mode generates simulated readings only.
