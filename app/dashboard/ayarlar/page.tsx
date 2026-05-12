"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Target, 
  Tag, 
  Percent, 
  Bell,
  MessageSquare,
  Clock,
  Shield
} from "lucide-react"

interface SettingToggle {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  defaultValue: boolean
  category: "sales" | "notification" | "security"
}

const settingsConfig: SettingToggle[] = [
  {
    id: "salesMode",
    title: "Satis Odakli Mod",
    description: "Vera musterilere daha aktif satis onerileri sunar ve urun tanitimi yapar.",
    icon: <Target className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: true,
    category: "sales"
  },
  {
    id: "campaignActive",
    title: "Kampanya Aktif",
    description: "Aktif kampanyalarinizi musterilere otomatik olarak tanitir.",
    icon: <Tag className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: false,
    category: "sales"
  },
  {
    id: "autoDiscount",
    title: "%10 Otomatik Indirim",
    description: "Belirli kosullarda musterilere otomatik %10 indirim uygular.",
    icon: <Percent className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: false,
    category: "sales"
  },
  {
    id: "stockAlerts",
    title: "Stok Uyarilari",
    description: "Kritik stok seviyelerinde aninda bildirim alin.",
    icon: <Bell className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: true,
    category: "notification"
  },
  {
    id: "messageNotifications",
    title: "Mesaj Bildirimleri",
    description: "Yeni musteri mesajlarinda aninda bildirim alin.",
    icon: <MessageSquare className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: true,
    category: "notification"
  },
  {
    id: "workingHours",
    title: "Calisma Saatleri Modu",
    description: "Vera sadece belirlenen calisma saatlerinde aktif olur (09:00 - 21:00).",
    icon: <Clock className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: false,
    category: "security"
  },
  {
    id: "orderConfirmation",
    title: "Siparis Onay Gerekli",
    description: "Tum siparisler icin manuel onay gerektirir.",
    icon: <Shield className="h-6 w-6 md:h-7 md:w-7" />,
    defaultValue: true,
    category: "security"
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    settingsConfig.forEach(s => {
      initial[s.id] = s.defaultValue
    })
    return initial
  })

  const handleToggle = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const salesSettings = settingsConfig.filter(s => s.category === "sales")
  const notificationSettings = settingsConfig.filter(s => s.category === "notification")
  const securitySettings = settingsConfig.filter(s => s.category === "security")

  const SettingCard = ({ setting }: { setting: SettingToggle }) => (
    <div 
      className={`flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 ${
        settings[setting.id] 
          ? "border-[#8faa8f] bg-[#f8faf8]" 
          : "border-[#e2e8e2] bg-white"
      }`}
    >
      <div className={`flex-shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center transition-colors ${
        settings[setting.id] 
          ? "bg-[#8faa8f] text-white" 
          : "bg-[#f5f7f5] text-muted-foreground"
      }`}>
        {setting.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <Label 
            htmlFor={setting.id} 
            className="text-lg md:text-xl font-semibold text-foreground cursor-pointer"
          >
            {setting.title}
          </Label>
          {/* Large Rounded Sage Green Toggle */}
          <Switch
            id={setting.id}
            checked={settings[setting.id]}
            onCheckedChange={() => handleToggle(setting.id)}
            className="h-8 w-16 md:h-9 md:w-18 data-[state=checked]:bg-[#8faa8f] data-[state=unchecked]:bg-[#e2e8e2] rounded-full"
          />
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {setting.description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Ayarlar</h1>
        <p className="text-muted-foreground text-base md:text-lg mt-1">
          Veranin davranislarini buradan ozellestirin
        </p>
      </div>

      {/* Sales Settings */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
            <div className="h-10 w-10 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-[#8faa8f]" />
            </div>
            Satis Ayarlari
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Veranin satis stratejilerini yonetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {salesSettings.map(setting => (
            <SettingCard key={setting.id} setting={setting} />
          ))}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
            <div className="h-10 w-10 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-[#8faa8f]" />
            </div>
            Bildirim Ayarlari
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Hangi bildirimleri almak istediginizi secin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationSettings.map(setting => (
            <SettingCard key={setting.id} setting={setting} />
          ))}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
            <div className="h-10 w-10 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-[#8faa8f]" />
            </div>
            Guvenlik ve Kontrol
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Isletmenizin guvenligini saglayin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {securitySettings.map(setting => (
            <SettingCard key={setting.id} setting={setting} />
          ))}
        </CardContent>
      </Card>

      {/* Save Indicator */}
      <div className="flex items-center justify-center p-4 bg-[#f8faf8] border border-[#e2e8e2] rounded-xl">
        <p className="text-base text-muted-foreground">
          Degisiklikler otomatik olarak kaydedilir
        </p>
      </div>
    </div>
  )
}
