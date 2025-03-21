package services

import (
	"context"
	"time"

	"backend/config"
	"github.com/supabase-community/gotrue-go"
)

// AuthService は認証関連の機能を提供するサービス
type AuthService struct {
	client gotrue.Client
}

// NewAuthService は新しいAuthServiceインスタンスを作成する
func NewAuthService(cfg *config.Config) *AuthService {
	client := gotrue.New(
		cfg.SupabaseURL+"/auth/v1",
		cfg.SupabaseAnonKey,
	)
	return &AuthService{
		client: client,
	}
}

// SignUp はユーザー登録を行う
func (s *AuthService) SignUp(ctx context.Context, email, password string) (*gotrue.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	signupOptions := gotrue.SignUpParams{
		Email:    email,
		Password: password,
	}

	return s.client.Signup(ctx, signupOptions)
}

// SignIn はログイン認証を行う
func (s *AuthService) SignIn(ctx context.Context, email, password string) (*gotrue.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	signInOptions := gotrue.SignInParams{
		Email:    email,
		Password: password,
	}

	return s.client.SignIn(ctx, signInOptions)
}

// GetUser はユーザー情報を取得する
func (s *AuthService) GetUser(ctx context.Context, token string) (*gotrue.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	return s.client.GetUser(ctx, token)
}

// SignOut はログアウト処理を行う
func (s *AuthService) SignOut(ctx context.Context, token string) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	return s.client.SignOut(ctx, token)
}