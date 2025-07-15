// instrumentation.js

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// ตั้งค่า Prometheus Exporter
// ตามมาตรฐาน PrometheusExporter จะเปิด endpoint /metrics ที่ port 9464
// เราสามารถปล่อยให้เป็นค่า default ได้เลย ซึ่งเป็นวิธีที่แนะนำ
const prometheusExporter = new PrometheusExporter({
  // port: 9464, // (Optional) Default port
  // endpoint: '/metrics' // (Optional) Default endpoint
});

// สร้าง SDK instance
const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [
    // เปิดใช้การติดตาม HTTP requests อัตโนมัติ
    new HttpInstrumentation()
  ],
});

// เริ่มการทำงานของ SDK
sdk.start();

// จัดการการปิดโปรแกรมอย่างสวยงาม (Graceful Shutdown)
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down successfully.'))
    .catch((error) => console.log('Error shutting down OpenTelemetry SDK:', error))
    .finally(() => process.exit(0));
});

console.log('Instrumentation file loaded, OpenTelemetry SDK is starting...');