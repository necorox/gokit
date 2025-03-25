# === デフォルト ===
.DEFAULT_GOAL := help

# === パス設定 ===
ATLAS_DIR := atlas
DOCKER_DIR := docker
SUPABASE_DIR := $(DOCKER_DIR)/supabase

DOCKER_COMPOSE_MAIN := -f $(DOCKER_DIR)/docker-compose.yml
DOCKER_COMPOSE_SUPABASE := -f $(SUPABASE_DIR)/docker-compose.yml

# === バックアップ保存パス ===
BACKUP_DIR := backups
BACKUP_FILE := $(BACKUP_DIR)/backup.sql

ENV_FILE := .env

include .env

help: ## このヘルプを表示
	@echo "📘 Available commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## ' Makefile | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2}'

up-all: ## Supabase & Application を一括起動
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_SUPABASE) up -d
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_MAIN) up -d

down-all: ## Supabase & Application を一括停止
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_MAIN) down
	docker compose --env-file $(ENV_FILE) $(DOCKER_COMPOSE_SUPABASE) down

atlas-diff: ## Atlas: スキーマ差分を生成
	docker compose $(DOCKER_COMPOSE_MAIN) run --rm atlas \
	migrate diff $(name) \
	--url "$(DATABASE_URL)" \
	--dev-url "$(DATABASE_URL)"  \
	--to file://schema \
	--dir file://migrations

atlas-apply: ## Atlas: マイグレーションを適用
	docker compose $(DOCKER_COMPOSE_MAIN) run --rm atlas \
	migrate apply \
	--url "$(DATABASE_URL)" 

atlas-apply-dirty: ## Atlas: 汚れた状態でもマイグレーションを適用
	docker compose $(DOCKER_COMPOSE_MAIN) run --rm atlas \
	migrate apply \
	--url "$(DATABASE_URL)"  \
	--allow-dirty

atlas-inspect: ## Atlas: DB構造をschema.hclへ書き出し
	docker compose $(DOCKER_COMPOSE_MAIN) run --rm \
	atlas schema inspect \
	-u "$(DATABASE_URL)" > atlas/schema/schema.hcl

atlas-inspect-console: ## Atlas: スキーマをコンソール出力で確認
	docker compose $(DOCKER_COMPOSE_MAIN) run --rm atlas \
	schema inspect \
	-u "$(DATABASE_URL)" \

db-reset: ## DB: publicスキーマを初期化（Supabase関連は残す）
	docker exec -i supabase-db psql -U postgres -d postgres -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"

reset-all: db-reset atlas-apply-dirty ## DB: 初期化してマイグレーション再適用

# DB: バックアップ
db-backup: ## DB: データベースをバックアップ（pg_dump使用）
	@mkdir -p $(BACKUP_DIR)
	docker exec supabase-db pg_dump -U $(POSTGRES_USER) -d $(POSTGRES_DB) > $(BACKUP_FILE)
	@echo "✅ Backup saved to $(BACKUP_FILE)"

# DB: リストア
db-restore: ## DB: バックアップからリストア（psql使用）
	docker exec -i supabase-db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB) < $(BACKUP_FILE)
	@echo "✅ Database restored from $(BACKUP_FILE)"