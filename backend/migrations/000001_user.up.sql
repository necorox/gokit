
-- ユーザーロール用のENUMタイプを作成
CREATE TYPE user_role_type AS ENUM (
    'user',            -- 通常ユーザー
    'plus',            -- 有料ユーザー
    'pro',             -- プロユーザー
    'enterprize',      -- 企業ユーザー
    'support',         -- サポートスタッフ
    'admin',           -- 管理者
    'dev',             -- 開発者
    'banned'           -- アカウント停止中
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_role user_role_type NOT NULL DEFAULT 'user',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
