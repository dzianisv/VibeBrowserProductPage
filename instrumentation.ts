const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
const otelHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS
const serviceName = process.env.OTEL_SERVICE_NAME || 'vibebrowser-product-page'

export async function register() {
  if (!otelEndpoint || !otelHeaders) {
    return
  }

  // Lazy import on purpose: @vercel/otel pulls in OpenTelemetry Node SDK
  // modules (node:perf_hooks and friends) that do not exist in the
  // Cloudflare Workers runtime. A static import crashed the instrumentation
  // hook there — and with it every request — before register() could no-op.
  // Loading it dynamically keeps that failure contained: on runtimes without
  // those modules, tracing is skipped with a warning instead of a 500.
  try {
    const { registerOTel } = await import('@vercel/otel')
    registerOTel({
      serviceName,
    })
  } catch (err) {
    console.warn('OTel registration skipped on this runtime:', err)
  }
}
