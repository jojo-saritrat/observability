// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { SimpleLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');

// 1. สร้าง Exporter สำหรับแต่ละ Signal (ทั้งหมดชี้ไปที่ OTLP endpoint เดียวกัน)
const traceExporter = new OTLPTraceExporter();
const metricExporter = new OTLPMetricExporter();
const logExporter = new OTLPLogExporter();

// 2. สร้าง MetricReader (สำหรับ Metrics) และ LogProcessor (สำหรับ Logs)
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 10000, // ส่งทุก 10 วินาที
});
const logRecordProcessor = new SimpleLogRecordProcessor(logExporter);

// 3. สร้าง SDK และกำหนดค่าสำหรับทุก Signal
const sdk = new NodeSDK({
  serviceName: 'unified-app',
  traceExporter: traceExporter,
  metricReader: metricReader,
  logRecordProcessor: logRecordProcessor,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PinoInstrumentation(),
  ],
});

sdk.start();
console.log('Unified instrumentation for Logs, Metrics, and Traces is running...');