// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleLogRecordProcessor, ConsoleLogRecordExporter} = require('@opentelemetry/sdk-logs');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
// 1. สร้าง Exporter สำหรับแต่ละ Signal (ทั้งหมดชี้ไปที่ OTLP endpoint เดียวกัน)
const spanProcessor = new SimpleSpanProcessor(new ConsoleSpanExporter());
const metricExporter = new PrometheusExporter();
const logExporter = new ConsoleLogRecordExporter();
const logRecordProcessor = new SimpleLogRecordProcessor(logExporter);

// 2. สร้าง SDK และกำหนดค่าสำหรับทุก Signal
const sdk = new NodeSDK({
  serviceName: '3-in-1-app',
  spanProcessor: spanProcessor,
  metricReader: metricExporter,
  logRecordProcessor: logRecordProcessor,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PinoInstrumentation(),
  ],
});

sdk.start();
console.log('Unified instrumentation for Logs, Metrics, and Traces is running...');