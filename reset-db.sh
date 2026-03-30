#!/bin/bash
# Полный сброс всех баз данных.
# Удаляет Docker volume и пересоздаёт контейнер с нуля.
#
# ВНИМАНИЕ: Удалит ВСЕ данные из ВСЕХ 6 баз.
# После сброса нужно заново запустить seed в каждом проекте.
#
# Использование: ./reset-db.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "⚠️  Это удалит ВСЕ данные из ВСЕХ 6 баз бенчмарка."
read -p "Продолжить? (y/N): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
  echo "Отменено."
  exit 0
fi

echo "=== Останавливаю контейнер ==="
docker compose -f docker-compose.shared-db.yml down -v

echo "=== Пересоздаю ==="
docker compose -f docker-compose.shared-db.yml up -d

echo "=== Жду готовности PostgreSQL ==="
sleep 3
until docker exec benchmark-postgres pg_isready -U benchmark > /dev/null 2>&1; do
  echo "  ожидание..."
  sleep 1
done

echo "=== Проверяю базы ==="
docker exec benchmark-postgres psql -U benchmark -c "\l" | grep bench_

echo ""
echo "✅ Все базы пересозданы. Запусти seed в каждом проекте."
