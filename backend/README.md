# GoKit Backend

Go言語でSupabase認証を使うバックエンドアプリケーションです。

## 開発環境のセットアップ

### 前提条件

- Go 1.24 以上
- Docker & Docker Compose
- Make（オプション）

### インストール手順

1. リポジトリをクローン
```bash
git clone https://github.com/necorox/gokit.git
cd gokit/backend
```

2. 開発環境のセットアップ（Makeを使用する場合）
```bash
make setup
```

または、手動で実行
```bash
# 依存関係のインストール
go mod tidy
go install github.com/cosmtrek/air@latest

# Supabaseのローカル環境を起動
docker-compose up -d
```

## 開発サーバーの起動

Airを使ったホットリロード開発サーバーの起動（Makeを使用する場合）
```bash
make dev
```

または、手動で実行
```bash
air
```

これにより、ファイルの変更を検知して自動的にアプリケーションが再起動されます。

## 利用可能なコマンド

Makefileで定義されているコマンド：

- `make dev` - Airを使った開発サーバーの起動
- `make build` - アプリケーションのビルド
- `make run` - ビルドしたバイナリの実行
- `make clean` - 生成されたビルドファイルの削除
- `make docker` - Dockerコンテナの起動
- `make docker-down` - Dockerコンテナの停止
- `make setup` - 開発環境の完全セットアップ

## APIエンドポイント

- `POST /signup` - ユーザー登録
- `POST /login` - ログイン
- `GET /user` - ユーザー情報取得（認証必須）
- `POST /logout` - ログアウト（認証必須）

## フォルダ構造

```
backend/
├── cmd/
│   └── api/        # エントリーポイント
│       └── main.go
├── config/         # 設定管理
├── handlers/       # HTTPハンドラー
├── middleware/     # ミドルウェア
├── models/         # データモデル
├── services/       # ビジネスロジック
├── utils/          # ユーティリティ関数
├── .air.toml       # Air設定ファイル
├── .env            # 環境変数
├── docker-compose.yml # Docker設定
├── go.mod          # Goモジュール定義
├── Makefile        # 開発タスク定義
└── README.md       # ドキュメント
```