#!/usr/bin/env bash
# Guard: this repo must not deploy the agentlabs.cc apex.
#
# VibeTechnologies/AgentPod-Web is the sole deployer of agentlabs.cc (signed v*
# tags). apps/agentlabs source may stay in this repo; a workflow here must not
# target that Vercel project.
#
# Distinction — do not collapse these:
#   .github/workflows/deploy-opencode-mobile-site.yml legitimately uses
#   AGENTLABS_VERCEL_TOKEN and AGENTLABS_VERCEL_ORG_ID. That job deploys a
#   DIFFERENT Vercel project (opencode.agentlabs.cc via
#   vars.OPENCODE_VERCEL_PROJECT_ID) under the same team token. This guard keys
#   off the apex project id and the apex project-id secret, NOT the shared
#   token/org secrets. A hit on TOKEN or ORG_ID alone is not a failure.
#
# Patterns are fixed strings (grep -F) and the search root is .github/workflows
# only, so this script's own source does not self-trigger.
set -euo pipefail

cd "$(dirname "$0")/.."

fail=0
wf=".github/workflows"

report_fixed() {
  local label="$1"
  local pattern="$2"
  local hits
  if hits=$(grep -rnF -- "$pattern" "$wf"); then
    echo "ERROR: ${label}"
    echo "$hits"
    fail=1
  fi
}

# Apex project-id secret. Shared TOKEN / ORG_ID secrets are intentionally not
# in this list.
report_fixed \
  "workflow references apex secret AGENTLABS_VERCEL_PROJECT_ID" \
  "AGENTLABS_VERCEL_PROJECT_ID"

report_fixed \
  "workflow references apex Vercel project id" \
  "prj_aupLFb5NjTy7tomL9DYmHjlTt84T"

report_fixed \
  "workflow reintroduces job deploy-agentlabs" \
  "deploy-agentlabs"

# Apex hostname in a vercel deploy/--prod or vercel alias command.
# Subdomains (opencode.agentlabs.cc, dl.agentlabs.cc) are not the apex.
# A bare mention in a comment or smoke-test URL is not a deploy/alias context.
has_apex_host() {
  local rest="$1" before last
  while [[ "$rest" == *'agentlabs.cc'* ]]; do
    before="${rest%%agentlabs.cc*}"
    last="${before: -1}"
    if [[ -z "$before" || "$last" != "." ]]; then
      return 0
    fi
    rest="${rest#*agentlabs.cc}"
  done
  return 1
}

is_vercel_deploy_or_alias() {
  local s="$1"
  [[ "$s" == *vercel* ]] || return 1
  if [[ "$s" == *alias* ]]; then
    return 0
  fi
  # `vercel --prod` / `vercel deploy --prod` is a production deploy.
  # `vercel build --prod` is not, unless the same command also deploys.
  if [[ "$s" == *'--prod'* ]]; then
    if [[ "$s" == *deploy* || "$s" != *build* ]]; then
      return 0
    fi
  fi
  return 1
}

shopt -s nullglob
for file in "$wf"/*.yml "$wf"/*.yaml; do
  [[ -f "$file" ]] || continue
  lines=()
  while IFS= read -r line || [[ -n "${line:-}" ]]; do
    lines+=("$line")
  done < "$file"
  n=${#lines[@]}
  i=0
  while (( i < n )); do
    start=$i
    logical="${lines[$i]}"
    while [[ "${lines[$i]}" == *'\' ]] && (( i + 1 < n )); do
      logical="${logical%\\}"
      i=$((i + 1))
      logical+=" ${lines[$i]}"
    done
    end=$i
    if is_vercel_deploy_or_alias "$logical" && has_apex_host "$logical"; then
      printed=0
      for (( j = start; j <= end; j++ )); do
        if has_apex_host "${lines[$j]}"; then
          echo "ERROR: apex hostname agentlabs.cc in a vercel --prod deploy or alias command"
          echo "${file}:$((j + 1)):${lines[$j]}"
          printed=1
          fail=1
        fi
      done
      if (( printed == 0 )); then
        echo "ERROR: apex hostname agentlabs.cc in a vercel --prod deploy or alias command"
        echo "${file}:$((start + 1)):${lines[$start]}"
        fail=1
      fi
    fi
    i=$((i + 1))
  done
done

if (( fail != 0 )); then
  exit 1
fi
echo "ok: no workflow deploys the agentlabs.cc apex"
exit 0
