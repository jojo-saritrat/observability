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
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// 1. สร้าง Exporter สำหรับแต่ละ Signal (ทั้งหมดชี้ไปที่ OTLP endpoint เดียวกัน)
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});
const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics',
});
const logExporter = new OTLPLogExporter({
  url: 'http://localhost:4318/v1/logs',
});

// สร้าง MetricReader (สำหรับ Metrics) และ LogProcessor (สำหรับ Logs)
const otlpExporter = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 500, // ส่งทุก 10 วินาที
});

// ใช้ในกรณีอยากให้ prometheus.scrape มาดึงค่า
// const prometheusExporter = new PrometheusExporter({ 
//   // port: 9464, // (Optional) Default port
//   // endpoint: '/metrics' // (Optional) Default endpoint
// }, () => {
//   // console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
// });
const logRecordProcessor = new SimpleLogRecordProcessor(logExporter);

// 3. สร้าง SDK และกำหนดค่าสำหรับทุก Signal
const sdk = new NodeSDK({
  serviceName: '3-in-1-app',
  traceExporter: traceExporter,
  metricReader: otlpExporter,
  logRecordProcessors: [logRecordProcessor],
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PinoInstrumentation(),
  ],
});

sdk.start();
console.log('3-in-1 instrumentation for Logs, Metrics, and Traces is running...');