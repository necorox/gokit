import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"

export default function UsersPage() {
  // Mock user data
  const users = [
    {
      id: "u1",
      name: "山田 太郎",
      email: "yamada.taro@example.com",
      status: "アクティブ",
      role: "ユーザー",
      lastActive: "2023-05-15T14:30:00",
    },
    {
      id: "u2",
      name: "佐藤 花子",
      email: "sato.hanako@example.com",
      status: "アクティブ",
      role: "管理者",
      lastActive: "2023-05-15T13:24:00",
    },
    {
      id: "u3",
      name: "鈴木 一郎",
      email: "suzuki.ichiro@example.com",
      status: "休止中",
      role: "ユーザー",
      lastActive: "2023-05-10T09:45:00",
    },
    {
      id: "u4",
      name: "田中 美咲",
      email: "tanaka.misaki@example.com",
      status: "アクティブ",
      role: "ユーザー",
      lastActive: "2023-05-15T11:12:00",
    },
    {
      id: "u5",
      name: "伊藤 健太",
      email: "ito.kenta@example.com",
      status: "アクティブ",
      role: "ユーザー",
      lastActive: "2023-05-14T16:50:00",
    },
    {
      id: "u6",
      name: "渡辺 直人",
      email: "watanabe.naoto@example.com",
      status: "休止中",
      role: "ユーザー",
      lastActive: "2023-05-01T10:30:00",
    },
    {
      id: "u7",
      name: "小林 さくら",
      email: "kobayashi.sakura@example.com",
      status: "アクティブ",
      role: "管理者",
      lastActive: "2023-05-15T09:15:00",
    },
    {
      id: "u8",
      name: "加藤 大輔",
      email: "kato.daisuke@example.com",
      status: "アクティブ",
      role: "ユーザー",
      lastActive: "2023-05-14T14:20:00",
    },
  ]

  // Format date to Japanese style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ユーザー一覧</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="ユーザーを検索..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            新規ユーザー
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ユーザー</CardTitle>
          <CardDescription>システムに登録されているユーザーの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ユーザー</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>権限</TableHead>
                <TableHead>最終アクティブ</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "アクティブ" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">メニューを開く</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>アクション</DropdownMenuLabel>
                        <DropdownMenuItem>詳細を表示</DropdownMenuItem>
                        <DropdownMenuItem>編集</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">削除</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

