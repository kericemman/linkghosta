#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/linkghosta"

cd "$APP_DIR"
git pull --ff-only
npm ci --omit=dev --prefix backend
npm ci --prefix frontend
npm run build --prefix frontend
pm2 startOrReload ecosystem.config.cjs --env production
pm2 save

for attempt in {1..15}; do
  if curl --fail --silent http://127.0.0.1:5001/api/health >/dev/null; then
    echo "LinkGhosta deployment completed successfully."
    exit 0
  fi
  sleep 2
done

echo "Deployment finished, but the API health check failed." >&2
pm2 logs linkghosta-api --lines 50 --nostream
exit 1
