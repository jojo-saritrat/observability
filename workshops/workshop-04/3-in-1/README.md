# Grafana Alloy x LGTM Observability Workshop

Welcome to the **Grafana Alloy x LGTM Observability Workshop**!  
This workshop is designed to help you understand how to collect, process, and visualize telemetry signals — **logs**, **metrics**, and **traces** — using the **LGTM Stack** and **Grafana Alloy**.

With just a few Docker commands, you’ll spin up a full observability lab that includes:

- A 3-in-1 sample app instrumented with OpenTelemetry
- Grafana Alloy to collect and forward telemetry signals
- LGTM Stack (Loki, Grafana, Tempo, Mimir) for visualization and storage
- Postman collection for easy testing

This guide is great for developers, SREs, or platform engineers looking to explore modern observability stacks without the need for a Kubernetes cluster.

Let’s get you observing in minutes — enjoy the hands-on experience! 


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