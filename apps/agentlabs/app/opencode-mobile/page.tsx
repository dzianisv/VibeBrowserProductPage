import { redirect } from "next/navigation"

// /opencode-mobile permanently redirects to /opencode (canonical page with rich content + JSON-LD)
export default function OpenCodeMobilePage() {
  redirect("/opencode")
}
