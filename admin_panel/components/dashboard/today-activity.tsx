import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TodayActivity() {
  // サンプルデータ - 本日のアクティビティログ
  const activities = [
    {
      id: 1,
      time: "09:15",
      user: "山田 太郎",
      action: "ログイン",
      details: "IPアドレス: 192.168.1.1",
    },
    {
      id: 2,
      time: "09:30",
      user: "佐藤 花子",
      action: "商品購入",
      details: "商品ID: PRD-123, 金額: ¥12,500",
    },
    {
      id: 3,
      time: "10:05",
      user: "鈴木 一郎",
      action: "プロフィール更新",
      details: "住所情報を変更",
    },
    {
      id: 4,
      time: "10:45",
      user: "田中 美咲",
      action: "商品購入",
      details: "商品ID: PRD-456, 金額: ¥15,800",
    },
    {
      id: 5,
      time: "11:20",
      user: "伊藤 健太",
      action: "商品レビュー",
      details: "商品ID: PRD-789, 評価: 5",
    },
    {
      id: 6,
      time: "12:10",
      user: "渡辺 直人",
      action: "ログイン",
      details: "IPアドレス: 192.168.1.42",
    },
    {
      id: 7,
      time: "13:30",
      user: "小林 さくら",
      action: "商品購入",
      details: "商品ID: PRD-234, 金額: ¥9,800",
    },
    {
      id: 8,
      time: "14:15",
      user: "加藤 大輔",
      action: "パスワード変更",
      details: "セキュリティ設定更新",
    },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>時間</TableHead>
              <TableHead>ユーザー</TableHead>
              <TableHead>アクション</TableHead>
              <TableHead>詳細</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.time}</TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

