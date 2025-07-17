// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  ConsoleLogRecordExporter, // ✅ Exporter สำหรับพิมพ์ออก Console
  SimpleLogRecordProcessor,
} = require('@opentelemetry/sdk-logs');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// 1. สร้าง Console Exporter สำหรับ Logs
const logExporter = new ConsoleLogRecordExporter();
const logRecordProcessor = new SimpleLogRecordProcessor(logExporter);

// 3. สร้าง SDK
const sdk = new NodeSDK({
  serviceName: 'manual-log-app',
  // กำหนดให้ Logs พิมพ์ออกทาง Console
  logRecordProcessor: logRecordProcessor,
  // ยังคงต้องมี instrumentation ของ http/express เพื่อสร้าง Span และ Trace Context
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

sdk.start();
console.log('Instrumentation for Manual Logs (Console) is running...');