import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36&text=YT" alt="Avatar" />
          <AvatarFallback>YT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">山田 太郎</p>
          <p className="text-sm text-muted-foreground">yamada.taro@example.com</p>
        </div>
        <div className="ml-auto font-medium">+¥12,500</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder.svg?height=36&width=36&text=SH" alt="Avatar" />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">佐藤 花子</p>
          <p className="text-sm text-muted-foreground">sato.hanako@example.com</p>
        </div>
        <div className="ml-auto font-medium">+¥8,350</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36&text=SI" alt="Avatar" />
          <AvatarFallback>SI</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">鈴木 一郎</p>
          <p className="text-sm text-muted-foreground">suzuki.ichiro@example.com</p>
        </div>
        <div className="ml-auto font-medium">+¥6,250</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36&text=TM" alt="Avatar" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">田中 美咲</p>
          <p className="text-sm text-muted-foreground">tanaka.misaki@example.com</p>
        </div>
        <div className="ml-auto font-medium">+¥15,800</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36&text=IK" alt="Avatar" />
          <AvatarFallback>IK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">伊藤 健太</p>
          <p className="text-sm text-muted-foreground">ito.kenta@example.com</p>
        </div>
        <div className="ml-auto font-medium">+¥9,420</div>
      </div>
    </div>
  )
}

