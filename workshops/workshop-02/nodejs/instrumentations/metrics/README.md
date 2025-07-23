#  OpenSDK Setup for Metrics

## Instructions

### 1. Navigate to `app.js`

Start by going to your project’s `app.js` file, where you will configure and initialize the necessary OpenTelemetry instrumentation.

### 2. Install Dependencies

Next, you need to install the required dependencies to set up OpenTelemetry for logging, metrics, and tracing.

Run the following command to install the necessary packages:

```bash
npm i @opentelemetry/api@^1.9.0 @opentelemetry/exporter-logs-otlp-http@^0.203.0 @opentelemetry/exporter-metrics-otlp-http@^0.203.0 @opentelemetry/exporter-prometheus@^0.203.0 @opentelemetry/exporter-trace-otlp-http@^0.203.0 @opentelemetry/instrumentation-express@^0.52.0 @opentelemetry/instrumentation-http@^0.203.0 @opentelemetry/instrumentation-pino@^0.50.0 @opentelemetry/sdk-node@^0.203.0 express@^5.1.0 pino@^9.7.0
```

These packages include OpenTelemetry components for logging, metrics, and tracing, along with Express and Pino for web server and logging functionality.

### 3. View Results in the Console

Once the dependencies are installed, run your application with the following command:

```bash
node  node --require ./instrumentations/metrics/instrumentation.js app.js
```

or

```bash
node  node --require ./instrumentations/metrics/with-express/instrumentation.js app.js
```

You should see logs, metrics, and trace information output to the console as the application runs. The OpenTelemetry SDK will automatically capture and export the relevant data for each component (logs, metrics, and traces) to the console.

**Note:**
- The application will display logs in the console from Pino, metrics from Prometheus, and traces using the OTLP exporter.
- Make sure to verify that the necessary exporters (OTLP for logs, metrics, and traces) are set up correctly in `app.js`.

---