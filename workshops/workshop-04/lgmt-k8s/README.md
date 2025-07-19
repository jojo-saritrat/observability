# Kubernetes Monitoring Stack Deployment

This guide provides step-by-step instructions to deploy the monitoring stack using Kubernetes manifests for the following components:
- Grafana
- Loki
- Mimir
- Alloy

---

## Step 1: Create Namespaces

Create individual namespaces for each component:

```bash
kubectl create namespace grafana
kubectl create namespace loki
kubectl create namespace mimir
kubectl create namespace alloy
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