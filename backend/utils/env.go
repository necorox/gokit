package utils

import "os"

// GetEnv は環境変数を取得し、デフォルト値を設定する
func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}