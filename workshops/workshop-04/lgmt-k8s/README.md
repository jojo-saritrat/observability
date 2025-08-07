# Kubernetes Monitoring Stack Deployment

Welcome to the **Kubernetes Monitoring Stack Deployment Guide**!

This repository contains everything you need to deploy a full observability stack on Kubernetes using only declarative manifests — no Helm, no scripts, just YAML and control.

You’ll be deploying the following key components:

- **Grafana** – for dashboards and visualization
- **Loki** – for log aggregation
- **Mimir** – for metrics storage and querying
- **Alloy** – as the telemetry collector and forwarder

This setup follows a clean, modular structure with **one namespace per component**, making it easy to manage, scale, and troubleshoot.

Whether you're testing observability tools, building your own platform stack, or exploring Grafana’s open source ecosystem — this guide will walk you through each step with clarity and simplicity.

Let’s get started!

This guide provides step-by-step instructions to deploy the monitoring stack using Kubernetes manifests for the following components:
- Grafana
- Loki
- Mimir
- Alloy

---

## Step 1: Create Namespaces

Create individual namespaces for each component:

```bash
kubectl create namespace lgmt
```

---

## Step 2: Navigate to Each Component's Directory

Each component has its own directory containing the Kubernetes manifests.

```bash
cd /path/to/deployment/alloy
```

Repeat for each component:

```bash
cd /path/to/deployment/grafana
cd /path/to/deployment/loki
cd /path/to/deployment/mimir
```

> Replace `/path/to/deployment` with the actual path in your environment.

---

## Step 3: Apply Kubernetes Manifests

For each component, apply the manifests to its respective namespace:

```bash
kubectl apply -f deployment.yaml -f service.yaml -f configmap.yaml -n <namespace>
```

Replace `<namespace>` with one of:
- `grafana`
- `loki`
- `mimir`
- `alloy`

For example:

```bash
kubectl apply -f deployment.yaml -f service.yaml -f configmap.yaml -n grafana
```

Repeat this step for each component in its respective folder.

---

## Summary

| Component | Namespace | Path                |
|-----------|-----------|---------------------|
| Grafana   | grafana   | `/grafana`          |
| Loki      | loki      | `/loki`             |
| Mimir     | mimir     | `/mimir`            |
| Alloy     | alloy     | `/alloy`            |

This structure ensures separation of concerns and easier troubleshooting per component.

---