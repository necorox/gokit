"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, LayoutDashboard, LogOut, Menu, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navItems = [
    {
      href: "/dashboard",
      title: "ダッシュボード",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/users",
      title: "ユーザー一覧",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/today",
      title: "本日の状況",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/week",
      title: "過去7日間",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/month",
      title: "過去1ヶ月",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:max-w-xs">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold px-4 py-2"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <span>管理パネル</span>
                  </Link>
                  <div className="mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileNavOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-muted"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="hidden md:inline-block">管理パネル</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex md:items-center md:gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="管理者" />
                  <AvatarFallback>管理</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">管理者</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">ログアウト</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <SidebarNav items={navItems} className="p-4 md:p-6" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("grid gap-2", className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary",
              isActive ? "bg-muted text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

