## Prerequisite
```bash
docker network create grafanet
```

## Running LGTM Stack
```bash
docker compose up -d
```

## Running 3-in-1 Application Instrumentation
```bash
cd app
npm install
node --require ./instrumentation.js ./app.js
```

## Running Alloy Agent
```bash
docker run --network grafanet --privileged --rm -p 4318:4318 -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data --stability.level=experimental  /etc/alloy/config.alloy
```

## Cleanup
```bash
docker compose down
```

## For Testing
- you can import `LGTM.postman_collection.json` via Postman import and then try to test each telemetry signal