# === デフォルト ===
.DEFAULT_GOAL := help

# === 開発環境パス設定 ===
DOCKER_DIR := docker
SUPABASE_DIR := $(DOCKER_DIR)/supabase

# === docker-compose 設定 ===
DOCKER_COMPOSE_MAIN := -f $(DOCKER_DIR)/docker-compose.yml
DOCKER_COMPOSE_SUPABASE := -f $(SUPABASE_DIR)/docker-compose.yml

# === マイグレーション設定 ===
MIGRATION_DIR := backend/migrations
MIGRATE_IMAGE := migrate/migrate:v4.15.2

# === バックアップ保存パス ===
BACKUP_DIR := backups
BACKUP_FILE := $(BACKUP_DIR)/backup.sql

# === ENVファイルパス ===
ENV_FILE := .env

# === 権限設定 ===
USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)


include .env

help: ## このヘルプを表示
	@echo "\n Available commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## ' Makefile | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2}'
	@echo "\n 開発手順 (例):"
	@echo "  1. make up-all             # Supabaseとアプリを起動"
	@echo "  2. make migrate-create     # 新しいマイグレーションファイルを作成"
	@echo "  3. make migrate-up         # マイグレーションを適用"
	@echo "  4. make sqlc-generate      # SQLCでGoコードを自動生成"
	@echo "  5. サーバーを起動して開発開始"

up-all: ## Supabase & Application を一括起動
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_SUPABASE) up -d
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_MAIN) up -d

down-all: ## Supabase & Application を一括停止
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_MAIN) down
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_SUPABASE) down

# === golang-migrate マイグレーションコマンド ===
migrate-up: ## DB: マイグレーション適用
	docker run --rm \
	  -v $(PWD)/$(MIGRATION_DIR):/migrations \
	  --network gokit-network \
	  $(MIGRATE_IMAGE) \
	  -path=/migrations \
	  -database "postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable" \
	  up

migrate-down: ## DB: マイグレーションを1つ戻す
	docker run --rm \
	  -v $(PWD)/$(MIGRATION_DIR):/migrations \
	  --network gokit-network \
	  $(MIGRATE_IMAGE) \
	  -path=/migrations \
	  -database "postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable" \
	  down 1

migrate-create: ## DB: 新しいマイグレーションファイルを作成（golang-migrate互換）
	@read -p "Enter migration name: " name; \
	  mkdir -p $(MIGRATION_DIR); \
	  latest_version=$$(find $(MIGRATION_DIR) -name "*.up.sql" | sort | tail -n 1 | sed -E 's/.*\/([0-9]+)_.*/\1/'); \
	  if [ -z "$$latest_version" ]; then \
	    next_version="000001"; \
	  else \
	    next_version=$$(printf "%06d" $$((10#$$latest_version + 1))); \
	  fi; \
	  touch $(MIGRATION_DIR)/$$next_version\_$$name.up.sql $(MIGRATION_DIR)/$$next_version\_$$name.down.sql; \
	  echo "✅ Migration $$next_version\_$$name created."

# === sqlc コマンド ===
sqlc-generate: ## SQLC: GoコードをDockerで自動生成
	docker run --rm \
	  -v $(PWD):/src \
	  -w /src \
	  kjconroy/sqlc generate

# === DB管理コマンド ===
db-reset: ## DB: publicスキーマを初期化（Supabase関連は残す）
	docker exec -i supabase-db psql -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"

reset-all: db-reset migrate-up ## DB: 初期化してマイグレーション再適用

# DB: バックアップ

db-backup: ## DB: データベースをバックアップ（pg_dump使用）
	@mkdir -p $(BACKUP_DIR)
	docker exec supabase-db pg_dump -U $(POSTGRES_USER) -d $(POSTGRES_DB) > $(BACKUP_FILE)
	@echo "✅ Backup saved to $(BACKUP_FILE)"

# DB: リストア
db-restore: ## DB: バックアップからリストア（psql使用）
	docker exec -i supabase-db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB) < $(BACKUP_FILE)
	@echo "✅ Database restored from $(BACKUP_FILE)"
