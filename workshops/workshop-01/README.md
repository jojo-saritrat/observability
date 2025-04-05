# Workshop 1: Traditional Deployment

## Instruction

# Running Load Balancer
```bash
docker run -d \
  --network=host \
  -p 80:80 \
  -v $(pwd)/workshops/workshop-01/nginx.conf:/etc/nginx/conf.d/default.conf \
  nginx

docker run --network=host -p 9113:9113 nginx/nginx-prometheus-exporter --nginx.scrape-uri=http://localhost/metrics 
```

**Note:**
- option `--network=host` เพื่อให้ container นั้นใช้ network ของ host ซึ่งจะทำให้ localhost:80 อ้างอิงไปยัง host จริง ๆ

References: 
- https://github.com/nginx/nginx-prometheus-exporter 
- https://nginx.org/en/docs/http/ngx_http_stub_status_module.html 
