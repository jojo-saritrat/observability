# Workshop 3: Alloy - Logs, Metrics, and Traces

## Introduction

In this workshop, we will explore the powerful components of Alloy, specifically focusing on handling **Logs**, **Metrics**, and **Traces**. These components are essential for observing and monitoring the health of your systems, enabling better decision-making and troubleshooting. 

### **Logs**
Logs help track the flow of activities within your application, providing insights into errors, performance issues, and system behaviors.

### **Metrics**
Metrics enable you to measure and visualize the performance and health of your system, such as response times, request counts, and error rates.

### **Traces**
Traces allow you to monitor the lifecycle of a request across different services, giving you a detailed view of how data flows within your architecture.

In this workshop, we'll walk through setting up Alloy for managing these components, with practical examples of how to configure and use Alloy for each.

## Example Setup

### Running Alloy for Logs, Metrics, and Traces

First, let's set up Alloy to collect and handle logs, metrics, and traces.

```bash
docker run --network grafanet --privileged --rm -p 12345:12345 \
  -v $(pwd)/config.alloy:/etc/alloy/config.alloy \
  -v $(pwd)/data:/tmp/logs \
  grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 \
  --storage.path=/var/lib/alloy/data \
  --stability.level=experimental \
  /etc/alloy/config.alloy