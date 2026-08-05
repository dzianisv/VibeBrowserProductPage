#!/usr/bin/env bash
# Guard: fail if Git LFS tracking is reintroduced, or a large binary is committed.
#
# Why: this repo previously stored ~211 MB of demo video across 24 LFS objects.
# Those objects are dead but permanently count against the account's LFS storage
# quota (GitHub cannot reclaim them without deleting the repo). Serving moved to
# GitHub Release assets (tag `media-v1`) behind the dl.agentlabs.cc Worker.
# Re-adding LFS would re-open the bandwidth/storage exposure with no way back.
#
# If you genuinely need LFS, this check must be changed deliberately in review.
set -euo pipefail

fail=0
err() { echo "::error::$*"; echo "ERROR: $*" >&2; fail=1; }

# 1. No tracked .gitattributes may declare an LFS filter.
while IFS= read -r f; do
  [ -n "$f" ] || continue
  if grep -qE 'filter=lfs' "$f"; then
    err "LFS tracking reintroduced in '$f':"
    grep -nE 'filter=lfs' "$f" >&2 || true
  fi
done < <(git ls-files '*.gitattributes' '.gitattributes')

# 2. No tracked file may be an LFS pointer.
while IFS= read -r f; do
  [ -f "$f" ] || continue
  if head -c 60 "$f" 2>/dev/null | grep -q '^version https://git-lfs'; then
    err "LFS pointer file committed: '$f'"
  fi
done < <(git ls-files)

# 3. No tracked blob over the size limit (videos belong in the media-v1 release).
LIMIT_BYTES=$((5 * 1024 * 1024))
while read -r _mode type sha size path; do
  [ "$type" = blob ] || continue
  [ "$size" = "-" ] && continue
  if [ "$size" -gt "$LIMIT_BYTES" ]; then
    err "Tracked file '$path' is $((size / 1024 / 1024)) MB (limit 5 MB). Upload it as a GitHub Release asset (tag media-v1) and reference it via dl.agentlabs.cc instead."
  fi
done < <(git ls-tree -r --long HEAD)

if [ "$fail" -eq 0 ]; then
  echo "OK: no Git LFS tracking, no LFS pointers, no oversized tracked files."
fi
exit "$fail"
