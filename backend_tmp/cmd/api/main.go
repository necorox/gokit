package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"backend/config"
	"backend/handlers"
	"backend/services"
)

func main() {
	// 環境変数の読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// 設定の初期化
	cfg := config.NewConfig()

	// サービスの初期化
	authService := services.NewAuthService(cfg)

	// ハンドラーの初期化
	authHandler := handlers.NewAuthHandler(authService)

	// ルーティングの設定
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Supabase Auth with Go - Home Page")
	})
	http.HandleFunc("/signup", authHandler.SignUp)
	http.HandleFunc("/login", authHandler.Login)
	http.HandleFunc("/user", authHandler.GetUser)
	http.HandleFunc("/logout", authHandler.Logout)

	// サーバーの起動
	addr := ":3000"
	fmt.Printf("Server is running on http://localhost%s\n", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}