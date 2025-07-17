docker run --rm -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy grafana/alloy:latest \
run \
--server.http.listen-addr=0.0.0.0:12345 \
--storage.path=/var/lib/alloy/data \
/etc/alloy/config.alloy
