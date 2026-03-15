'use client'

import { useCallback } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

type ReportableMetric = {
  id: string
  name: string
  delta: number
  value: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  navigationType?: string
}

const WEB_VITALS_ENDPOINT = '/api/telemetry/web-vitals'

export function WebVitals() {
  const reportMetric = useCallback((metric: ReportableMetric) => {
    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      delta: metric.delta,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
      pathname: window.location.pathname,
      href: window.location.href,
    })

    if (navigator.sendBeacon) {
      const beacon = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon(WEB_VITALS_ENDPOINT, beacon)
      return
    }

    void fetch(WEB_VITALS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      keepalive: true,
    })
  }, [])

  useReportWebVitals(reportMetric)

  return null
}
