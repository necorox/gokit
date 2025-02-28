"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// サンプルデータ - 過去7日間のデータ
const data = [
  {
    name: "月曜日",
    users: 320,
    sales: 145000,
  },
  {
    name: "火曜日",
    users: 350,
    sales: 156000,
  },
  {
    name: "水曜日",
    users: 410,
    sales: 178000,
  },
  {
    name: "木曜日",
    users: 380,
    sales: 165000,
  },
  {
    name: "金曜日",
    users: 450,
    sales: 198000,
  },
  {
    name: "土曜日",
    users: 520,
    sales: 230000,
  },
  {
    name: "日曜日",
    users: 480,
    sales: 210000,
  },
]

export function WeeklyOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} name="アクティブユーザー" />
        <Bar dataKey="sales" fill="#82ca9d" radius={[4, 4, 0, 0]} name="売上 (円)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

