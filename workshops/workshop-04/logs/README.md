
## Prerequisite
```bash
docker network create grafanet
```

```bash
docker compose up -d
```

## How to run alloy
```bash
docker run --privileged --rm -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy -v $(pwd)/text.log:/tmp/txt/text.log -v $(pwd)/json.log:/tmp/json/json.log  grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data /etc/alloy/config.alloy
```