package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message string `json:"message"`
	Token   string `json:"token,omitempty"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "許可されていないメソッドです", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "リクエストが不正です", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if req.Email == "admin@admin.com" && req.Password == "password" {
		// 成功レスポンス
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(LoginResponse{
			Message: "ログイン成功",
			Token:   "dummy-jwt-token",
		}); err != nil {
			log.Println("レスポンスのエンコードに失敗:", err)
		}
	} else {
		// 認証失敗レスポンス
		w.WriteHeader(http.StatusUnauthorized)
		if err := json.NewEncoder(w).Encode(LoginResponse{
			Message: "認証情報が間違っています",
		}); err != nil {
			log.Println("レスポンスのエンコードに失敗:", err)
		}
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello, World!"))
}

func main() {
	http.HandleFunc("/api/login", loginHandler)
	http.HandleFunc("/", rootHandler)

	log.Println("サーバー起動: ポート8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("サーバー起動に失敗:", err)
	}
}
