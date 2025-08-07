# Grafana Alloy Observability Stack (Logs-focused)

Welcome to this lightweight **Grafana Alloy observability workshop**!

This mini project demonstrates how to collect and visualize logs using **Grafana Alloy**, **Loki**, and **Grafana**, all running in Docker. It’s a great way to get hands-on with observability tools — without needing Kubernetes or a complex cloud setup.

---

## What’s in This Workshop?

- Spin up a monitoring stack using `docker compose` in just a few commands
- Use **Grafana Alloy** to collect logs from both plaintext (`text.log`) and structured JSON (`json.log`)
- Visualize logs directly in **Grafana dashboards** via **Loki**
- Simple and easy to understand setup — perfect for learning and experimentation

You’ll explore how observability pipelines work, how `Alloy` tails `.log` files, and how everything connects together in real-time — no guesswork, no fluff.

Let’s get logging!

## Prerequisite
```bash
docker network create grafanet
```

```bash
docker compose up -d
```

## How to run alloy
```bash
docker run --network grafanet --privileged --rm -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy -v $(pwd)/data/text.log:/tmp/logs/text.log -v $(pwd)/data/json.log:/tmp/logs/json.log  grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data /etc/alloy/config.alloy
```

## How to run alloy in powershell
```powershell
docker run --network grafanet --privileged --rm  -p 12345:12345  -v ${pwd}/config.alloy:/etc/alloy/config.alloy -v ${pwd}/data/text.log:/tmp/logs/text.log -v ${pwd}/data/json.log:/tmp/logs/json.log  grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data  /etc/alloy/config.alloy
```