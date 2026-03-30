-- Создаём отдельную БД для каждого варианта бенчмарка.
-- PostgreSQL выполняет этот скрипт ОДИН раз при первом запуске контейнера.
-- Если контейнер перезапускается — скрипт НЕ выполняется повторно
-- (данные сохраняются в Docker volume benchmark-pgdata).

CREATE DATABASE bench_claude_code;
CREATE DATABASE bench_v0;
CREATE DATABASE bench_stitch;
CREATE DATABASE bench_canva;
CREATE DATABASE bench_pencil;
CREATE DATABASE bench_figma;

-- Даём пользователю benchmark полные права на все БД
GRANT ALL PRIVILEGES ON DATABASE bench_claude_code TO benchmark;
GRANT ALL PRIVILEGES ON DATABASE bench_v0 TO benchmark;
GRANT ALL PRIVILEGES ON DATABASE bench_stitch TO benchmark;
GRANT ALL PRIVILEGES ON DATABASE bench_canva TO benchmark;
GRANT ALL PRIVILEGES ON DATABASE bench_pencil TO benchmark;
GRANT ALL PRIVILEGES ON DATABASE bench_figma TO benchmark;
