"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, ExternalLink, BookOpen, Layers, Code, LayoutDashboard } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Here you would connect to your Go backend for authentication
      // This is a placeholder for demonstration
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("ログインに失敗しました。認証情報を確認してください。")
      }

      // If login successful, redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      // For demo purposes, let's simulate a successful login
      // In production, remove this and use the actual authentication
      if (email && password) {
        setIsLoading(false)
        router.push("/dashboard")
        return
      }

      setError(err instanceof Error ? err.message : "ログインに失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const demoPages = [
    { name: "gRPC挨拶サービス", path: "/test", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "サンプルページ", path: "/sample", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "コンポーネント一覧", path: "/components", icon: <Layers className="h-4 w-4 mr-2" /> },
    { name: "API テスト", path: "/api-test", icon: <ExternalLink className="h-4 w-4 mr-2" /> },
    { name: "ダッシュボード", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl font-bold text-center">管理パネル</CardTitle>

        </CardHeader>

        <Tabs defaultValue="login" className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">ログイン</TabsTrigger>
              <TabsTrigger value="demo">デモページ</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="m-0">
            <CardContent className="pt-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <CardDescription className="text-center">アカウント情報でログインしてください</CardDescription>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">パスワード</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                  {isLoading ? "ログイン中..." : "ログイン"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="demo" className="m-0">
            <CardContent className="pt-4 pb-6">
              <div className="text-sm font-medium mb-3">テストページとサンプル</div>
              <div className="grid gap-2">
                {demoPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.path}
                    passHref
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {page.icon}
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <div className="h-px bg-gray-200 my-2" />

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-muted-foreground">
            管理者アカウントが必要な場合は、システム管理者に連絡してください。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}