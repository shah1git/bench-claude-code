# Бенчмарк: AI-генерация дизайна карточки товара

6 AI-инструментов × одна задача × одинаковая инфраструктура = честное сравнение.

## Варианты

| Проект | Порт | AI-подход | Статус |
|--------|------|-----------|--------|
| bench-claude-code | 3101 | Claude Code + frontend-design skill | ⬜ |
| bench-v0 | 3102 | v0.dev → Claude Code интеграция | ⬜ |
| bench-stitch | 3103 | Google Stitch → Claude Code конвертация | ⬜ |
| bench-canva | 3104 | Canva MCP → Claude Code реализация | ⬜ |
| bench-pencil | 3105 | Pencil.dev MCP → Claude Code реализация | ⬜ |
| bench-figma | 3106 | Figma AI → Claude Code pixel-perfect | ⬜ |

## Быстрый старт

```bash
# 1. Запустить общую PostgreSQL (один раз)
docker compose -f docker-compose.shared-db.yml up -d

# 2. В каждом проекте: установить зависимости и заполнить БД
cd bench-claude-code && npm install && npm run seed && cd ..

# 3. Запустить все dev-серверы
./start-all.sh

# 4. Остановить все
./start-all.sh stop

# 5. Сбросить все базы (если нужно начать заново)
./reset-db.sh
```

## Общая PostgreSQL

- Контейнер: `benchmark-postgres`
- Порт: `5499` (localhost)
- User: `benchmark` / Password: `benchmark_dev`
- 6 баз: bench_claude_code, bench_v0, bench_stitch, bench_canva, bench_pencil, bench_figma

## Стек (одинаковый для всех)

- Next.js 15 (App Router)
- Payload CMS 3
- PostgreSQL 16
- Tailwind CSS + shadcn/ui
- TypeScript strict

## Что сравниваем

Только UI страницы `/catalog/[slug]` — карточка товара.
Всё остальное (коллекции, seed, каталог, главная) идентично.

## Scorecard

См. SCORECARD.md
