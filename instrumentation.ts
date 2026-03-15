import { registerOTel } from '@vercel/otel'

const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
const otelHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS
const serviceName = process.env.OTEL_SERVICE_NAME || 'vibebrowser-product-page'

export function register() {
  if (!otelEndpoint || !otelHeaders) {
    return
  }

  registerOTel({
    serviceName,
  })
}
