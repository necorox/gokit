package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"backend/models"
	"backend/services"
)

// AuthHandler は認証関連のリクエストを処理するハンドラー
type AuthHandler struct {
	authService *services.AuthService
}

// NewAuthHandler は新しいAuthHandlerインスタンスを作成する
func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// SignUp はユーザー登録リクエストを処理する
func (h *AuthHandler) SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds models.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// サインアップ処理
	response, err := h.authService.SignUp(r.Context(), creds.Email, creds.Password)
	if err != nil {
		http.Error(w, fmt.Sprintf("Signup error: %v", err), http.StatusInternalServerError)
		return
	}

	// レスポンスの送信
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// Login はログインリクエストを処理する
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds models.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// ログイン処理
	response, err := h.authService.SignIn(r.Context(), creds.Email, creds.Password)
	if err != nil {
		http.Error(w, fmt.Sprintf("Login error: %v", err), http.StatusInternalServerError)
		return
	}

	// レスポンスの送信
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// GetUser はユーザー情報取得リクエストを処理する
func (h *AuthHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// トークンの取得
	token, err := extractToken(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// ユーザー情報の取得
	user, err := h.authService.GetUser(r.Context(), token)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get user: %v", err), http.StatusInternalServerError)
		return
	}

	// レスポンスの送信
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

// Logout はログアウトリクエストを処理する
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// トークンの取得
	token, err := extractToken(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// ログアウト処理
	if err := h.authService.SignOut(r.Context(), token); err != nil {
		http.Error(w, fmt.Sprintf("Logout error: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Successfully logged out")
}

// extractToken はリクエストヘッダーからJWTトークンを抽出する
func extractToken(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", fmt.Errorf("authorization header required")
	}

	// "Bearer "プレフィックスの確認と削除
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return "", fmt.Errorf("invalid authorization header format")
	}

	return authHeader[7:], nil
}