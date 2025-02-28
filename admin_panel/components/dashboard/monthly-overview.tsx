"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// サンプルデータ - 過去1ヶ月のデータ（週別）
const data = [
  {
    name: "第1週",
    users: 1250,
    sales: 850000,
  },
  {
    name: "第2週",
    users: 1380,
    sales: 920000,
  },
  {
    name: "第3週",
    users: 1520,
    sales: 1050000,
  },
  {
    name: "第4週",
    users: 1680,
    sales: 1150000,
  },
]

export function MonthlyOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="アクティブユーザー"
        />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} name="売上 (円)" />
      </LineChart>
    </ResponsiveContainer>
  )
}

