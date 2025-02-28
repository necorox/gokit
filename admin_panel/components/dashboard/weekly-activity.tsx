import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function WeeklyActivity() {
  // サンプルデータ - 週間アクティビティサマリー
  const activities = [
    {
      id: 1,
      day: "月曜日",
      logins: 245,
      signups: 12,
      purchases: 56,
      revenue: "¥145,000",
    },
    {
      id: 2,
      day: "火曜日",
      logins: 267,
      signups: 15,
      purchases: 62,
      revenue: "¥156,000",
    },
    {
      id: 3,
      day: "水曜日",
      logins: 312,
      signups: 18,
      purchases: 78,
      revenue: "¥178,000",
    },
    {
      id: 4,
      day: "木曜日",
      logins: 289,
      signups: 14,
      purchases: 65,
      revenue: "¥165,000",
    },
    {
      id: 5,
      day: "金曜日",
      logins: 345,
      signups: 22,
      purchases: 85,
      revenue: "¥198,000",
    },
    {
      id: 6,
      day: "土曜日",
      logins: 410,
      signups: 28,
      purchases: 95,
      revenue: "¥230,000",
    },
    {
      id: 7,
      day: "日曜日",
      logins: 378,
      signups: 25,
      purchases: 88,
      revenue: "¥210,000",
    },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>曜日</TableHead>
              <TableHead>ログイン数</TableHead>
              <TableHead>新規登録</TableHead>
              <TableHead>購入数</TableHead>
              <TableHead>売上</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.day}</TableCell>
                <TableCell>{activity.logins}</TableCell>
                <TableCell>{activity.signups}</TableCell>
                <TableCell>{activity.purchases}</TableCell>
                <TableCell>{activity.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

