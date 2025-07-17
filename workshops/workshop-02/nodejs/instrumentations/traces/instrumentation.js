// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const sdk = new NodeSDK({
  serviceName: 'my-express-app',
  spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()), // ส่งออก Traces
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

sdk.start();
console.log('Node.js app is instrumented for Tracing...');