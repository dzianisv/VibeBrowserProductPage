"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyablePromptProps {
  text: string
  title?: string
  copyLabel?: string
  className?: string
}

export function CopyablePrompt({
  text,
  title = "Copyable prompt",
  copyLabel = "Copy prompt",
  className = "",
}: CopyablePromptProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus("copied")
      window.setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 2500)
    }
  }

  const statusText = status === "copied" ? "Copied" : status === "error" ? "Copy failed" : copyLabel

  return (
    <div className={`overflow-hidden rounded-xl border border-[rgba(136,146,176,0.15)] bg-[rgba(5,8,16,0.96)] ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(136,146,176,0.15)] bg-[rgba(11,16,32,0.94)] px-5 py-3">
        <p className="text-sm text-[#b7c0db]">{title}</p>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(136,146,176,0.2)] bg-[rgba(158,158,255,0.08)] px-3 py-1.5 text-sm font-medium text-[#d8dcff] transition-colors hover:border-[rgba(158,158,255,0.38)] hover:bg-[rgba(158,158,255,0.14)] focus:outline-none focus:ring-2 focus:ring-[#9e9eff] focus:ring-offset-2 focus:ring-offset-[#050810]"
          aria-label={`${copyLabel} to clipboard`}
        >
          {status === "copied" ? <Check className="h-4 w-4 text-[#81c995]" /> : <Copy className="h-4 w-4" />}
          <span aria-live="polite">{statusText}</span>
        </button>
      </div>
      <pre className="max-h-[34rem] overflow-x-auto whitespace-pre-wrap p-5 text-sm leading-6 text-[#b4b4ff]">
        <code>{text}</code>
      </pre>
    </div>
  )
}
