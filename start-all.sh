#!/bin/bash
# Запуск всех 6 вариантов бенчмарка одновременно.
# Каждый проект — Next.js dev-сервер на своём порту.
#
# Использование:
#   ./start-all.sh          — запустить все dev-серверы
#   ./start-all.sh stop     — остановить все dev-серверы
#
# Логи каждого сервера пишутся в файл logs/<variant>.log

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
PID_DIR="${SCRIPT_DIR}/pids"

# Конфигурация: variant → порт
declare -A PORTS=(
  ["bench-claude-code"]=3101
  ["bench-v0"]=3102
  ["bench-stitch"]=3103
  ["bench-canva"]=3104
  ["bench-pencil"]=3105
  ["bench-figma"]=3106
)

stop_all() {
  echo "=== Остановка всех dev-серверов ==="
  for PID_FILE in "${PID_DIR}"/*.pid; do
    [ -f "$PID_FILE" ] || continue
    PID=$(cat "$PID_FILE")
    VARIANT=$(basename "$PID_FILE" .pid)
    if kill -0 "$PID" 2>/dev/null; then
      kill "$PID" 2>/dev/null
      echo "  Остановлен ${VARIANT} (PID ${PID})"
    fi
    rm -f "$PID_FILE"
  done
  echo "Готово."
}

if [ "$1" == "stop" ]; then
  stop_all
  exit 0
fi

# Создать папки для логов и PID-файлов
mkdir -p "$LOG_DIR" "$PID_DIR"

# Проверить что PostgreSQL работает
if ! docker exec benchmark-postgres pg_isready -U benchmark > /dev/null 2>&1; then
  echo "❌ PostgreSQL не запущена. Сначала выполни:"
  echo "   docker compose -f docker-compose.shared-db.yml up -d"
  exit 1
fi

echo "=== Запуск dev-серверов ==="
echo ""

STARTED=0
for VARIANT in "${!PORTS[@]}"; do
  PORT="${PORTS[$VARIANT]}"
  DIR="${SCRIPT_DIR}/${VARIANT}"

  if [ ! -d "$DIR" ]; then
    echo "⚠️  ${VARIANT}: директория не найдена, пропускаю"
    continue
  fi

  if [ ! -f "$DIR/package.json" ]; then
    echo "⚠️  ${VARIANT}: package.json не найден, пропускаю"
    continue
  fi

  # Убить старый процесс если есть
  PID_FILE="${PID_DIR}/${VARIANT}.pid"
  if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    kill "$OLD_PID" 2>/dev/null || true
  fi

  echo "🚀 ${VARIANT} → http://localhost:${PORT}"
  cd "$DIR"
  npx next dev -p "$PORT" > "${LOG_DIR}/${VARIANT}.log" 2>&1 &
  echo $! > "$PID_FILE"
  cd "$SCRIPT_DIR"
  STARTED=$((STARTED + 1))
done

echo ""
echo "=== Запущено ${STARTED} серверов ==="
echo ""
echo "Порты:"
for VARIANT in $(echo "${!PORTS[@]}" | tr ' ' '\n' | sort); do
  PORT="${PORTS[$VARIANT]}"
  DIR="${SCRIPT_DIR}/${VARIANT}"
  [ -d "$DIR" ] && echo "  ${VARIANT}: http://localhost:${PORT}"
done
echo ""
echo "Логи: ${LOG_DIR}/<variant>.log"
echo "Остановить: ./start-all.sh stop"
