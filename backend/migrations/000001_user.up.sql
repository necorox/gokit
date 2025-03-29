CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ベースユーザーテーブル
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_uuid UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
    username VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_users_user_uuid ON users(user_uuid);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email_address ON users(email_address);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ユーザー役割テーブル
CREATE TABLE user_groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL UNIQUE,
    group_description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 権限（パーミッション）テーブル
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    permission_code VARCHAR(100) NOT NULL UNIQUE,
    permission_description TEXT,
    resource_name VARCHAR(100) NOT NULL, -- 対象リソース (users, items, etc.)
    action_name VARCHAR(50) NOT NULL,    -- 操作 (create, read, update, delete, etc.)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(resource_name, action_name)
);

-- ユーザーグループと権限の多対多関連テーブル
CREATE TABLE group_permissions (
    group_id INTEGER NOT NULL REFERENCES user_groups(id),
    permission_id INTEGER NOT NULL REFERENCES permissions(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, permission_id)
);

-- ユーザーとグループの多対多関連テーブル
CREATE TABLE user_group_memberships (
    user_id INTEGER NOT NULL REFERENCES users(id),
    group_id INTEGER NOT NULL REFERENCES user_groups(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, group_id)
);

-- JWTトークン管理テーブル
CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token_jti VARCHAR(255) NOT NULL UNIQUE, -- JWT ID（一意の識別子）
    token_type VARCHAR(50) NOT NULL,         -- 'access', 'refresh' など
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    device_info TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX idx_user_tokens_token_jti ON user_tokens(token_jti);
CREATE INDEX idx_user_tokens_expires_at ON user_tokens(expires_at);
CREATE INDEX idx_user_tokens_is_revoked ON user_tokens(is_revoked);

-- 初期ユーザーグループデータ
INSERT INTO user_groups (group_name, group_description) VALUES
('user', 'ユーザー'),
('admin', '管理者'),
('support', 'サポート'),
('developers', '開発者');

-- 初期権限データ
INSERT INTO permissions (permission_code, permission_description, resource_name, action_name) VALUES
-- ユーザー関連権限
('user_view_self', '自分のプロフィールを閲覧', 'users', 'view_self'),
('user_edit_self', '自分のプロフィールを編集', 'users', 'edit_self'),
('user_view_any', '任意のユーザープロフィールを閲覧', 'users', 'view_any'),
('user_edit_any', '任意のユーザープロフィールを編集', 'users', 'edit_any'),
('user_delete_any', 'ユーザーを削除', 'users', 'delete_any'),
('user_ban', 'ユーザーをBAN', 'users', 'ban'),

-- システム関連権限
('system_view_logs', 'システムログを閲覧', 'system', 'view_logs'),
('system_manage', 'システム設定を管理', 'system', 'manage');

-- グループに権限を割り当て
-- ユーザー権限
INSERT INTO group_permissions (group_id, permission_id) 
SELECT 
    (SELECT id FROM user_groups WHERE group_name = 'user'),
    id 
FROM permissions 
WHERE permission_code IN ('user_view_self', 'user_edit_self');

-- 管理者権限（すべての権限）
INSERT INTO group_permissions (group_id, permission_id) 
SELECT 
    (SELECT id FROM user_groups WHERE group_name = 'admin'),
    id 
FROM permissions;

-- サポート権限
INSERT INTO group_permissions (group_id, permission_id) 
SELECT 
    (SELECT id FROM user_groups WHERE group_name = 'support'),
    id 
FROM permissions 
WHERE permission_code IN ('user_view_self', 'user_edit_self', 'user_view_any', 'system_view_logs');

-- 開発者権限
INSERT INTO group_permissions (group_id, permission_id) 
SELECT 
    (SELECT id FROM user_groups WHERE group_name = 'developers'),
    id 
FROM permissions;