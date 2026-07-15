#!/usr/bin/env bash

# ═══════════════════════════════════════════════════════════
# vickydurel.me — personal brand website — Apple Container launcher
# ═══════════════════════════════════════════════════════════
# Patterned after v3/start-v3-container.sh (single service).
# Uses: Apple `container` CLI (macOS 26+ Apple Silicon)
#
# Usage:
#   ./start-dev-container.sh            Start dev server (default)
#   ./start-dev-container.sh up         Same as above
#   ./start-dev-container.sh down       Stop the dev container
#   ./start-dev-container.sh restart    Stop then start
#   ./start-dev-container.sh rebuild    Wipe dev volumes and restart
#   ./start-dev-container.sh prod       Build + serve the production bundle (:3130+)
#   ./start-dev-container.sh prod-down  Stop the production container
#   ./start-dev-container.sh logs       Tail dev logs
#   ./start-dev-container.sh status     Show running containers
#   ./start-dev-container.sh exec <cmd> Run a command in the dev container
#   ./start-dev-container.sh help       Show this message
#
# Port auto-switching: if :3030 is taken, the next free port
# (up to +99) is used and printed.
#
# Volume isolation (Apple Container volume mounts are EXCLUSIVE —
# a volume can only attach to one running container):
#   dev : vickydurel-web-node-modules      + vickydurel-web-next-dev
#   prod: vickydurel-web-node-modules-prod + vickydurel-web-next-prod
# .next lives on per-mode volumes so `next dev` can never corrupt a
# production build that is being served.
# ═══════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="vickydurel-web"
SERVICE="web"
CNAME="${PROJECT_NAME}-${SERVICE}"
DEFAULT_PORT=3030
PROD_DEFAULT_PORT=3130
NODE_IMAGE="node:22-alpine"
MODULES_VOLUME="${PROJECT_NAME}-node-modules"
NEXT_DEV_VOLUME="${PROJECT_NAME}-next-dev"
PROD_CNAME="${PROJECT_NAME}-prod"
PROD_MODULES_VOLUME="${PROJECT_NAME}-node-modules-prod"
NEXT_PROD_VOLUME="${PROJECT_NAME}-next-prod"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; NC='\033[0m'

# ── Runtime ────────────────────────────────────────────────────

ensure_container_runtime() {
  if ! command -v container &>/dev/null; then
    echo -e "${RED}Apple \`container\` CLI not found.${NC}"
    echo "  1. Download: https://github.com/apple/container/releases"
    echo "  2. Then run: container system start"
    exit 1
  fi
  if container ls &>/dev/null; then
    return 0
  fi
  echo -e "${YELLOW}container runtime not running — starting…${NC}"
  if container system start 2>/dev/null; then
    sleep 2
    container ls &>/dev/null && return 0
  fi
  echo -e "${RED}Could not start the Apple container runtime. Run: container system start${NC}"
  exit 1
}

container_running() {
  container ls 2>/dev/null | grep -q "$CNAME"
}

# ── Ports ──────────────────────────────────────────────────────

is_port_free() {
  local port="$1"
  lsof -ti :"$port" &>/dev/null && return 1
  return 0
}

resolve_port() {
  local start="${1:-$DEFAULT_PORT}"
  local port=$start
  while ! is_port_free "$port"; do
    port=$((port + 1))
    if [ "$port" -gt "$((start + 99))" ]; then
      echo -e "${RED}ERROR: no free port near ${start}${NC}" >&2
      exit 1
    fi
  done
  echo "$port"
}

# Pass known server-side secrets/config through to the container if present in
# a local .env / .env.local. Values are never printed. ZEPTOMAIL_API_TOKEN is
# read for when the contact form is wired to email delivery.
collect_env_args() {
  ENV_ARGS=()
  local env_file key val
  for env_file in "${SCRIPT_DIR}/.env.local" "${SCRIPT_DIR}/.env"; do
    if [ -f "$env_file" ]; then
      for key in ZEPTOMAIL_API_TOKEN; do
        val=$(grep "^${key}=" "$env_file" | head -1 | cut -d= -f2- || true)
        [ -n "$val" ] && ENV_ARGS+=(-e "${key}=${val}")
      done
      break
    fi
  done
}

# ── Lifecycle ──────────────────────────────────────────────────

start_web() {
  if container_running; then
    echo -e "${GREEN}✓ ${CNAME} already running${NC}"
    container ls | grep "$CNAME" || true
    return 0
  fi

  local port
  port=$(resolve_port)
  [ "$port" != "$DEFAULT_PORT" ] &&
    echo -e "${YELLOW}:${DEFAULT_PORT} taken → using :${port}${NC}"

  collect_env_args

  echo -e "${CYAN}Starting ${CNAME} on :${port}…${NC}"
  container rm "$CNAME" 2>/dev/null || true
  container run \
    --name "$CNAME" \
    --detach --rm \
    --cpus 2 --memory "3g" \
    -p "${port}:3000" \
    -v "${SCRIPT_DIR}:/app" \
    -v "${MODULES_VOLUME}:/app/node_modules" \
    -v "${NEXT_DEV_VOLUME}:/app/.next" \
    -w /app \
    "${ENV_ARGS[@]+"${ENV_ARGS[@]}"}" \
    "$NODE_IMAGE" \
    sh -c "if [ ! -f node_modules/.package-lock.json ]; then npm install; fi; npm run dev -- -p 3000" \
    > /dev/null 2>&1

  sleep 3
  if container_running; then
    echo -e "${GREEN}✓ website dev up → http://localhost:${port}${NC}"
    echo -e "  home:        http://localhost:${port}/"
    echo -e "  insights:    http://localhost:${port}/insights"
    echo -e "  field note:  http://localhost:${port}/insights/where-ai-belongs"
    echo -e "  logs: ./start-dev-container.sh logs"
  else
    echo -e "${RED}Container failed to start. Check: container logs ${CNAME}${NC}"
    exit 1
  fi
}

stop_web() {
  echo -e "${CYAN}Stopping ${CNAME}…${NC}"
  container stop "$CNAME" 2>/dev/null || true
  container rm "$CNAME" 2>/dev/null || true
  echo -e "${GREEN}✓ stopped${NC}"
}

start_prod() {
  local port
  port=$(resolve_port "$PROD_DEFAULT_PORT")
  collect_env_args

  echo -e "${CYAN}Building production bundle (isolated volumes)…${NC}"
  container run --rm \
    --cpus 4 --memory "4g" \
    -v "${SCRIPT_DIR}:/app" \
    -v "${PROD_MODULES_VOLUME}:/app/node_modules" \
    -v "${NEXT_PROD_VOLUME}:/app/.next" \
    -w /app \
    "$NODE_IMAGE" \
    sh -c "if [ ! -f node_modules/.package-lock.json ]; then npm install --no-audit --no-fund; fi; npm run build"

  echo -e "${CYAN}Starting ${PROD_CNAME} on :${port}…${NC}"
  container rm "$PROD_CNAME" 2>/dev/null || true
  container run \
    --name "$PROD_CNAME" \
    --detach --rm \
    --cpus 2 --memory "2g" \
    -p "${port}:3000" \
    -v "${SCRIPT_DIR}:/app" \
    -v "${PROD_MODULES_VOLUME}:/app/node_modules" \
    -v "${NEXT_PROD_VOLUME}:/app/.next" \
    -w /app \
    -e NODE_ENV=production \
    "${ENV_ARGS[@]+"${ENV_ARGS[@]}"}" \
    "$NODE_IMAGE" \
    sh -c "npm run start -- -p 3000" > /dev/null 2>&1

  sleep 3
  if container ls 2>/dev/null | grep -q "$PROD_CNAME"; then
    echo -e "${GREEN}✓ website production build up → http://localhost:${port}${NC}"
  else
    echo -e "${RED}Production container failed. Check: container logs ${PROD_CNAME}${NC}"
    exit 1
  fi
}

stop_prod() {
  echo -e "${CYAN}Stopping ${PROD_CNAME}…${NC}"
  container stop "$PROD_CNAME" 2>/dev/null || true
  container rm "$PROD_CNAME" 2>/dev/null || true
  echo -e "${GREEN}✓ stopped${NC}"
}

# ── Dispatch ───────────────────────────────────────────────────

cmd="${1:-up}"
case "$cmd" in
  up)
    ensure_container_runtime
    start_web
    ;;
  down)
    ensure_container_runtime
    stop_web
    ;;
  restart)
    ensure_container_runtime
    stop_web
    start_web
    ;;
  rebuild)
    ensure_container_runtime
    stop_web
    echo -e "${CYAN}Removing dev volumes…${NC}"
    container volume rm "$MODULES_VOLUME" 2>/dev/null || true
    container volume rm "$NEXT_DEV_VOLUME" 2>/dev/null || true
    start_web
    ;;
  prod)
    ensure_container_runtime
    stop_prod
    start_prod
    ;;
  prod-down)
    ensure_container_runtime
    stop_prod
    ;;
  logs)
    container logs --follow "$CNAME"
    ;;
  status)
    container ls
    ;;
  exec)
    shift
    container exec -it "$CNAME" "${@:-sh}"
    ;;
  help|-h|--help)
    sed -n '3,28p' "$0"
    ;;
  *)
    echo -e "${RED}Unknown command: ${cmd}${NC} (try: ./start-dev-container.sh help)"
    exit 1
    ;;
esac
