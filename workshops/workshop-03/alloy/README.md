# Grafana Alloy

- Grafana Helm Charts: [Github](https://github.com/grafana/helm-charts/tree/main/charts)
- Grafana Alloy Helm Chart [Github](https://github.com/grafana/alloy/tree/main/operations/helm/charts/alloy)
- ArtifactHub: [Link](https://artifacthub.io/packages/search?org=grafana&sort=relevance&page=1)

## Prerequisite
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

## Installation
```bash
helm install alloy grafana/alloy -n alloy -f values.yaml
```

**If update helm `values.yaml` file**
```bash
helm upgrade alloy grafana/alloy -f values.yaml -n alloy
```

```bash
kubectl create configmap alloy --from-file="config.alloy=./config.alloy" -n alloy 
```

## Create a `grafana-credentials.yaml` file 

```yaml
apiVersion: v1
kind: Secret
metadata:
  namespace: alloy
  name: grafana-credentials
type: Opaque
stringData:
  prometheus-rw-user: "prom-user"
  prometheus-rw-pwd: "prom-pwd"
  tempo-rw-user: "tempo-user"
  tempo-rw-pwd: "tempo-pwd"
```

```bash
kubectl apply -f grafana-credentials.yaml
```

## Customize helm `values.yaml` file
```yaml
alloy:
  securityContext:
    privileged: true # important!
controller:
  hostPID: true # important!
```

## Install Grafana LGTM Stack via Helm≈

## References
- Alloy with Beyla: [Doc](https://grafana.com/docs/beyla/latest/setup/helm-alloy/)
