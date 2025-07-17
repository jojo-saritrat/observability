// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// 1. Import Logs API ของ OpenTelemetry
const { logs } = require('@opentelemetry/api-logs');
const { SeverityNumber } = require('@opentelemetry/api-logs');

// 2. สร้าง Logger instance
const logger = logs.getLogger('my-manual-logger');

app.get('/', (req, res) => {
  // 3. สร้าง Log Record ด้วยตนเองผ่านคำสั่ง logger.emit()
  // เนื่องจากโค้ดนี้ทำงานภายใน request handler ที่มี Trace อยู่แล้ว
  // OTel จะนำ traceId และ spanId มาใส่ใน Log Record ให้โดยอัตโนมัติ
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    body: 'Handling request for / manually.',
    attributes: { 'user.id': '123', 'http.method': 'GET' },
  });

  res.status(200).json({ service: 'Service 1', status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});