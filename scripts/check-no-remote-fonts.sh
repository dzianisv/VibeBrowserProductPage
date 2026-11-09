#!/usr/bin/env bash
set -euo pipefail

# cd to repo root (scripts/ is one level below root)
cd "$(dirname "$0")/.."

FONT_FILE="app/fonts/newsreader-latin-variable.woff2"

# Check vendored font file exists and is a real woff2 (magic bytes wOF2)
if [[ ! -f "$FONT_FILE" ]]; then
  echo "FAIL: $FONT_FILE is missing" >&2
  exit 1
fi

magic=$(head -c 4 "$FONT_FILE")
if [[ "$magic" != "wOF2" ]]; then
  echo "FAIL: $FONT_FILE is not a valid woff2 file (bad magic bytes)" >&2
  exit 1
fi

# Search for next/font/google usage in tracked source files
if command -v git >/dev/null 2>&1 && git rev-parse --git-dir >/dev/null 2>&1; then
  # Use git grep to search tracked files only
  matches=$(git grep --untracked -n "next/font/google" -- "." \
    ":!node_modules" ":!.next" ":!.worktrees" ":!dist" ":!scripts/check-no-remote-fonts.sh" 2>/dev/null || true)
else
  # Fallback to grep if git unavailable
  matches=$(grep -rn "next/font/google" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.worktrees --exclude-dir=dist \
    --exclude="scripts/check-no-remote-fonts.sh" . 2>/dev/null || true)
fi

if [[ -n "$matches" ]]; then
  echo "FAIL: Found next/font/google usage (build must not depend on fonts.googleapis.com):" >&2
  echo "$matches" >&2
  exit 1
fi

echo "OK: no next/font/google usage (fonts are self-hosted)"
exit 0
