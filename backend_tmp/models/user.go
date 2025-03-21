package models

// Credentials はログインおよびサインアップのための資格情報
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AuthResponse は認証レスポンスのモデル
type AuthResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	User         User   `json:"user"`
}

// User はユーザー情報のモデル
type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}