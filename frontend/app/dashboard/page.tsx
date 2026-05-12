"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Bot, 
  AlertTriangle, 
  ShoppingBag,
  MessageSquare,
  Package,
  Sparkles,
  Heart,
  Clock,
  Zap,
  Bell
} from "lucide-react"
import Link from "next/link"

// Demo data
const statsData = {
  dailySales: "12.450 TL",
  veraActions: 47,
  criticalStock: 3,
  totalOrders: 18
}

const criticalStockItems = [
  { name: "Organik Zeytinyagi (5L)", current: 2, minimum: 10 },
  { name: "Dogal Bal (1kg)", current: 3, minimum: 15 },
  { name: "Ev Yapimi Recel", current: 5, minimum: 20 },
]

const recentActivities = [
  { type: "sale", message: "Yeni siparis alindi - 250 TL", time: "2 dk once" },
  { type: "message", message: "WhatsApptan musteri sorgusu yanitlandi", time: "5 dk once" },
  { type: "stock", message: "Zeytinyagi stok uyarisi olusturuldu", time: "15 dk once" },
]

// Vera's Emotional Summary - "What did Vera do today?"
const veraToday = {
  questionsAnswered: 40,
  salesSaved: 3,
  timeSaved: "2 saat 15 dk",
  happyCustomers: 12
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Hos Geldiniz!</h1>
          <p className="text-muted-foreground text-base md:text-lg mt-1">
            Bugunku isletme ozetiniz
          </p>
        </div>
        
        {/* Quick Action - Pending Approvals */}
        <Link 
          href="/dashboard/onaylar"
          className="flex items-center gap-3 px-4 py-3 bg-[#b87333]/10 hover:bg-[#b87333]/20 rounded-xl transition-colors border border-[#b87333]/20"
        >
          <Bell className="h-5 w-5 text-[#b87333]" />
          <span className="text-sm font-medium text-[#b87333]">3 onay bekliyor</span>
        </Link>
      </div>

      {/* Vera Today - Emotional Summary Card */}
      <Card className="border-2 border-[#8faa8f]/30 bg-gradient-to-br from-[#8faa8f]/5 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8faa8f]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#8faa8f] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            Vera Bugun Ne Yapti?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <div className="text-center p-4 bg-white rounded-xl border border-[#e2e8e2] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#8faa8f]/10 flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="h-5 w-5 text-[#8faa8f]" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{veraToday.questionsAnswered}</p>
              <p className="text-sm text-muted-foreground">soruya cevap verdim</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl border border-[#e2e8e2] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#b87333]/10 flex items-center justify-center mx-auto mb-2">
                <Zap className="h-5 w-5 text-[#b87333]" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{veraToday.salesSaved}</p>
              <p className="text-sm text-muted-foreground">satisi kurtardim</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl border border-[#e2e8e2] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{veraToday.timeSaved}</p>
              <p className="text-sm text-muted-foreground">zaman kazandirdim</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl border border-[#e2e8e2] shadow-sm">
              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{veraToday.happyCustomers}</p>
              <p className="text-sm text-muted-foreground">mutlu musteri</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[#8faa8f]/10 rounded-xl">
            <p className="text-base text-foreground italic text-center">
              "Bugun sizi <span className="font-bold text-[#8faa8f]">2 saat 15 dakikalik</span> dertten kurtardim ve{" "}
              <span className="font-bold text-[#b87333]">3 adet satisi</span> kacmak uzereyken yakaladim!"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Daily Sales */}
        <Card className="border border-[#e2e8e2] bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Gunluk Satis
            </CardTitle>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#8faa8f]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {statsData.dailySales}
            </div>
            <p className="text-xs md:text-sm text-[#8faa8f] mt-1 font-medium">
              +12% dunden fazla
            </p>
          </CardContent>
        </Card>

        {/* Vera Actions */}
        <Card className="border border-[#e2e8e2] bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Vera Islemleri
            </CardTitle>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-[#b87333]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {statsData.veraActions}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Bugun yapilan islem
            </p>
          </CardContent>
        </Card>

        {/* Critical Stock */}
        <Card className="border-2 border-red-200 bg-red-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm md:text-base font-medium text-red-600">
              Kritik Stok
            </CardTitle>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-red-600">
              {statsData.criticalStock}
            </div>
            <p className="text-xs md:text-sm text-red-500 mt-1">
              Urun yenilenmeli
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="border border-[#e2e8e2] bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Gunluk Siparis
            </CardTitle>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#8faa8f]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {statsData.totalOrders}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Aktif siparis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Critical Stock List */}
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
              Kritik Stok Uyarilari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticalStockItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-base text-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg md:text-xl font-bold text-red-600">
                    {item.current}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{item.minimum}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-[#b87333]" />
              Son Vera Aktiviteleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#fafbfa] border border-[#e8ede8]"
              >
                <div className="h-10 w-10 rounded-full bg-[#8faa8f]/10 flex items-center justify-center flex-shrink-0">
                  {activity.type === "sale" && <ShoppingBag className="h-5 w-5 text-[#8faa8f]" />}
                  {activity.type === "message" && <MessageSquare className="h-5 w-5 text-[#8faa8f]" />}
                  {activity.type === "stock" && <Package className="h-5 w-5 text-[#b87333]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-foreground">
                    {activity.message}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
