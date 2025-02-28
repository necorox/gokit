import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TodayOverview } from "@/components/dashboard/today-overview"
import { TodayActivity } from "@/components/dashboard/today-activity"
import { ArrowUpRight, Users, Activity, CreditCard, DollarSign } from "lucide-react"

export default function TodayPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">本日の状況</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日のアクティブユーザー</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +5% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              昨日比
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の新規ユーザー</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +12% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              昨日比
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の売上</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥123,456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +18% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              昨日比
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の取引数</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +8% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              昨日比
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="activity">アクティビティ</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>本日の概要</CardTitle>
                <CardDescription>本日のユーザーアクティビティと売上の時間別推移</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TodayOverview />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>本日のアクティビティ</CardTitle>
                <CardDescription>本日のユーザーアクティビティの詳細</CardDescription>
              </CardHeader>
              <CardContent>
                <TodayActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

