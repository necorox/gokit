package config

import (
	"backend/utils"
)

// Config はアプリケーションの設定を保持する構造体
type Config struct {
	SupabaseURL         string
	SupabaseAnonKey     string
	SupabaseServiceRole string
}

// NewConfig は新しい設定インスタンスを作成する
func NewConfig() *Config {
	return &Config{
		SupabaseURL:         utils.GetEnv("SUPABASE_URL", "http://localhost:8000"),
		SupabaseAnonKey:     utils.GetEnv("ANON_KEY", "your-anon-key"),
		SupabaseServiceRole: utils.GetEnv("SERVICE_ROLE_KEY", "your-service-role"),
	}
}