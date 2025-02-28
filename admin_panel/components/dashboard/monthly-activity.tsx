import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MonthlyActivity() {
  // サンプルデータ - 月間アクティビティサマリー（週別）
  const activities = [
    {
      id: 1,
      week: "第1週",
      logins: 1250,
      signups: 145,
      purchases: 320,
      revenue: "¥850,000",
    },
    {
      id: 2,
      week: "第2週",
      logins: 1380,
      signups: 168,
      purchases: 356,
      revenue: "¥920,000",
    },
    {
      id: 3,
      week: "第3週",
      logins: 1520,
      signups: 185,
      purchases: 412,
      revenue: "¥1,050,000",
    },
    {
      id: 4,
      week: "第4週",
      logins: 1680,
      signups: 210,
      purchases: 458,
      revenue: "¥1,150,000",
    },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>週</TableHead>
              <TableHead>ログイン数</TableHead>
              <TableHead>新規登録</TableHead>
              <TableHead>購入数</TableHead>
              <TableHead>売上</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.week}</TableCell>
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

