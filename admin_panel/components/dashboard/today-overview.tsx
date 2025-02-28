"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// サンプルデータ - 本日の時間別データ
const data = [
  {
    time: "00:00",
    users: 12,
    sales: 5400,
  },
  {
    time: "02:00",
    users: 8,
    sales: 3200,
  },
  {
    time: "04:00",
    users: 5,
    sales: 2100,
  },
  {
    time: "06:00",
    users: 10,
    sales: 4500,
  },
  {
    time: "08:00",
    users: 25,
    sales: 11000,
  },
  {
    time: "10:00",
    users: 38,
    sales: 16500,
  },
  {
    time: "12:00",
    users: 45,
    sales: 19800,
  },
  {
    time: "14:00",
    users: 42,
    sales: 18300,
  },
  {
    time: "16:00",
    users: 50,
    sales: 22000,
  },
  {
    time: "18:00",
    users: 47,
    sales: 20500,
  },
  {
    time: "20:00",
    users: 35,
    sales: 15200,
  },
  {
    time: "22:00",
    users: 22,
    sales: 9800,
  },
]

export function TodayOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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

