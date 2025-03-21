package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"backend/services"
)

// AuthMiddleware は認証ミドルウェア
type AuthMiddleware struct {
	authService *services.AuthService
}

// NewAuthMiddleware は新しいAuthMiddlewareインスタンスを作成する
func NewAuthMiddleware(authService *services.AuthService) *AuthMiddleware {
	return &AuthMiddleware{
		authService: authService,
	}
}

// RequireAuth は認証が必要なエンドポイント用のミドルウェア
func (m *AuthMiddleware) RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// トークンの取得
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}

		// "Bearer "プレフィックスの確認と削除
		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			return
		}

		token := authHeader[7:]

		// トークンの検証（オプション：より厳密な認証が必要な場合）
		user, err := m.authService.GetUser(r.Context(), token)
		if err != nil {
			http.Error(w, fmt.Sprintf("Invalid or expired token: %v", err), http.StatusUnauthorized)
			return
		}

		// ユーザー情報をコンテキストに追加
		ctx := context.WithValue(r.Context(), "user", user)
		next(w, r.WithContext(ctx))
	}
}