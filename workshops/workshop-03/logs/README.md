```bash
docker run --network grafanet --privileged --rm -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy -v $(pwd)/data:/tmp/logs grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data --stability.level=experimental  /etc/alloy/config.alloy
```