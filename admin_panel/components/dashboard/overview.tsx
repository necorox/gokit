"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// サンプルデータ
const data = [
  {
    name: "1日",
    total: 1200,
    users: 320,
  },
  {
    name: "2日",
    total: 1500,
    users: 350,
  },
  {
    name: "3日",
    total: 1300,
    users: 310,
  },
  {
    name: "4日",
    total: 1600,
    users: 380,
  },
  {
    name: "5日",
    total: 1400,
    users: 340,
  },
  {
    name: "6日",
    total: 1800,
    users: 400,
  },
  {
    name: "7日",
    total: 1700,
    users: 390,
  },
  {
    name: "8日",
    total: 1900,
    users: 420,
  },
  {
    name: "9日",
    total: 2000,
    users: 450,
  },
  {
    name: "10日",
    total: 1800,
    users: 410,
  },
  {
    name: "11日",
    total: 2100,
    users: 470,
  },
  {
    name: "12日",
    total: 2200,
    users: 490,
  },
  {
    name: "13日",
    total: 2000,
    users: 460,
  },
  {
    name: "14日",
    total: 2300,
    users: 510,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value}`}
        />
        <Tooltip formatter={(value: number) => [`¥${value}`, "売上"]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

