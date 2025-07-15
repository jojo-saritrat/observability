// app.js (ตัวอย่างที่แก้ไข)
const express = require('express');
const app = express();
const PORT = 3000;
// Import และสร้าง logger ของ pino
const logger = require('pino')();

app.get('/service-1', (req, res) => {
  // ใช้ logger.info แทน console.log
  logger.info('Received a request for /service-1');
  res.status(200).json({ service: 'Service 1', status: 'OK' });
});

app.listen(PORT, () => {
  logger.info(`Application is running at http://localhost:${PORT}`);
});