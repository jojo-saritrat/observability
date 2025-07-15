// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const {
  SimpleLogRecordProcessor,
} = require('@opentelemetry/sdk-logs');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');

// 1. ตั้งค่า Log Exporter เพื่อส่งข้อมูลไปที่ OTLP/HTTP endpoint
const logExporter = new OTLPLogExporter();

// 2. สร้าง Log Processor
const logRecordProcessor = new SimpleLogRecordProcessor(logExporter);

// 3. สร้าง SDK
const sdk = new NodeSDK({
  // 4. กำหนด LogRecordProcessor ให้กับ SDK
  logRecordProcessor: logRecordProcessor,
  // 5. เปิดใช้งาน instrumentation สำหรับ pino
  instrumentations: [new PinoInstrumentation()],
});

sdk.start();
console.log('Instrumentation for Logs is running...');