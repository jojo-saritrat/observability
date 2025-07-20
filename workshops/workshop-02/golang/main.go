package main

import (
	"context"
	"github.com/gofiber/contrib/otelfiber"
	"github.com/gofiber/fiber/v2"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.opentelemetry.io/otel/attribute"
	"go.uber.org/zap"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	_ "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func main() {
	ctx := context.Background()

	// Setup Zap Logger
	logger, _ := zap.NewProduction()
	defer logger.Sync()
	sugar := logger.Sugar()

	// Setup OTLP Trace Exporter
	traceExp, err := otlptracehttp.New(ctx,
		otlptracehttp.WithEndpoint("localhost:4318"),
		otlptracehttp.WithInsecure(),
	)
	if err != nil {
		sugar.Fatalw("Failed to create OTLP Trace Exporter", "error", err)
	}

	// Setup OTEL Resource
	res, err := resource.New(ctx,
		resource.WithAttributes(attribute.String("service.name", "fiber-zap-metric-app")),
	)
	if err != nil {
		sugar.Fatalw("Failed to create resource", "error", err)
	}

	// Setup Tracer Provider
	tp := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(traceExp),
		sdktrace.WithResource(res),
	)
	defer tp.Shutdown(ctx)
	otel.SetTracerProvider(tp)

	// Fiber App with OTEL Middleware
	app := fiber.New()
	app.Use(otelfiber.Middleware(
		otelfiber.WithTracerProvider(tp),
		//otelfiber.WithServiceName("fiber-zap-metric-app"),
	))

	app.Get("/", func(c *fiber.Ctx) error {
		sugar.Infow("Accessed root route")
		return c.SendString("Welcome! Use /service-1, /service-2 or check /metrics at :9464")
	})

	app.Get("/service-1", func(c *fiber.Ctx) error {
		_, span := otel.Tracer("fiber-zap-metric-app").Start(c.UserContext(), "service-1")
		defer span.End()

		if c.Query("status") == "error" {
			sugar.Errorw("Service 1 Error")
			return c.Status(500).JSON(fiber.Map{
				"service": "Service 1",
				"status":  "ERROR",
			})
		}

		delay := rand.Intn(100) + 50
		time.Sleep(time.Duration(delay) * time.Millisecond)
		sugar.Infow("Service 1 OK", "delay_ms", delay)

		return c.JSON(fiber.Map{
			"service": "Service 1",
			"status":  "OK",
			"delay":   strconv.Itoa(delay) + "ms",
		})
	})

	app.Get("/service-2", func(c *fiber.Ctx) error {
		_, span := otel.Tracer("fiber-zap-metric-app").Start(c.UserContext(), "service-2")
		defer span.End()

		if c.Query("status") == "error" {
			sugar.Errorw("Service 2 Error")
			return c.Status(500).JSON(fiber.Map{
				"service": "Service 2",
				"status":  "ERROR",
			})
		}

		delay := rand.Intn(200) + 100
		time.Sleep(time.Duration(delay) * time.Millisecond)
		sugar.Infow("Service 2 OK", "delay_ms", delay)

		return c.JSON(fiber.Map{
			"service": "Service 2",
			"status":  "OK",
			"delay":   strconv.Itoa(delay) + "ms",
		})
	})

	// Start Fiber at :3000
	go func() {
		sugar.Infow("Starting Fiber HTTP server at :3000")
		log.Fatal(app.Listen(":3000"))
	}()

	// Start Prometheus Metrics Server at :9464
	http.Handle("/metrics", promhttp.Handler())
	sugar.Infow("Starting Prometheus Metrics server at :9464/metrics")
	log.Fatal(http.ListenAndServe(":9464", nil))
}
