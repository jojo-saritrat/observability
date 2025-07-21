// app.js

const express = require('express');
const app = express();
const PORT = 8080;

// Import Logs API ของ OpenTelemetry
const { logs } = require('@opentelemetry/api-logs');
const { SeverityNumber } = require('@opentelemetry/api-logs');

// สร้าง Logger instance
const logger = logs.getLogger('3-in-1 manual logs');

// path หลักสำหรับแนะนำ
app.get('/', (req, res) => {
  res.send('Welcome! Try accessing /service-1 or /service-2. Add ?status=error to simulate an error.');
});

// path สำหรับ Service 1
app.get('/service-1', (req, res) => {
  // ตรวจสอบ query parameter ที่ชื่อ status

  if (req.query.status === 'error') {
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      body: 'ERROR / service-1',
      attributes: { 'user.id': '123', 'http.method': 'GET' },
    });
    // ถ้า status=error ให้ส่ง status code 500 กลับไป
    res.status(500).json({ service: 'Service 1', status: 'ERROR', message: 'Simulated internal server error.' });
  } else {
    // ถ้าปกติ ให้ทำงานเหมือนเดิม
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      body: 'Handling request for / service-1',
      attributes: { 'user.id': '123', 'http.method': 'GET' },
    });
    const delay = Math.floor(Math.random() * 100) + 50;
    setTimeout(() => {
      res.status(200).json({ service: 'Service 1', status: 'OK', delay: `${delay}ms` });
    }, delay);
  }
});

// path สำหรับ Service 2
app.get('/service-2', (req, res) => {
  // ตรวจสอบ query parameter ที่ชื่อ status
  if (req.query.status === 'error') {
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      body: 'ERROR / service-2',
      attributes: { 'user.id': '123', 'http.method': 'GET' },
    });
    // ถ้า status=error ให้ส่ง status code 500 กลับไป
    res.status(500).json({ service: 'Service 2', status: 'ERROR', message: 'Simulated internal server error.' });
  } else {
    // ถ้าปกติ ให้ทำงานเหมือนเดิม
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      body: 'Handling request for / service-2',
      attributes: { 'user.id': '123', 'http.method': 'GET' },
    });
    const delay = Math.floor(Math.random() * 200) + 100;
    setTimeout(() => {
      res.status(200).json({ service: 'Service 2', status: 'OK', delay: `${delay}ms` });
    }, delay);
  }
});

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});