"use client"

import React, { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Target, Tag, Percent, Bell, MessageSquare,
  Clock, Shield, Loader2, CheckCircle2
} from "lucide-react"

// Konfigürasyon yapısı aynı kalıyor
const settingsConfig = [
  { id: "salesMode", title: "Satış Odaklı Mod", description: "Vera müşterilere daha aktif satış önerileri sunar.", icon: <Target />, category: "sales" },
  { id: "campaignActive", title: "Kampanya Aktif", description: "Aktif kampanyalarınızı otomatik tanıtır.", icon: <Tag />, category: "sales" },
  { id: "autoDiscount", title: "%10 Otomatik İndirim", description: "Koşullara göre otomatik indirim uygular.", icon: <Percent />, category: "sales" },
  { id: "stockAlerts", title: "Stok Uyarıları", description: "Kritik seviyelerde anında bildirim alın.", icon: <Bell />, category: "notification" },
  { id: "messageNotifications", title: "Mesaj Bildirimleri", description: "Yeni mesajlarda anında bildirim alın.", icon: <MessageSquare />, category: "notification" },
  { id: "workingHours", title: "Çalışma Saatleri Modu", description: "Vera 09:00 - 21:00 arası aktif olur.", icon: <Clock />, category: "security" },
  { id: "orderConfirmation", title: "Sipariş Onay Gerekli", description: "Tüm siparişler için manuel onay gerektirir.", icon: <Shield />, category: "security" },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // AYARLARI VERİTABANINDAN ÇEK
  useEffect(() => {
    async function fetchSettings() {
      setLoading(true)
      const { data, error } = await supabase.from('settings').select('*')

      if (data) {
        const settingsMap: Record<string, boolean> = {}
        data.forEach(s => settingsMap[s.id] = s.value)
        setSettings(settingsMap)
      }
      setLoading(false)
    }
    fetchSettings()
  }, [])

  // AYARI GÜNCELLE VE DB'YE YAZ
  const handleToggle = async (id: string) => {
    const newValue = !settings[id]

    // UI'da anında güncelle (Optimistic update)
    setSettings(prev => ({ ...prev, [id]: newValue }))
    setIsSaving(true)

    const { error } = await supabase
      .from('settings')
      .upsert({ id, value: newValue, updated_at: new Date() })

    if (error) {
      console.error("Ayar kaydedilemedi:", error)
      // Hata olursa geri al
      setSettings(prev => ({ ...prev, [id]: !newValue }))
    }

    setTimeout(() => setIsSaving(false), 800)
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-[#8faa8f]" />
    </div>
  )

  const SettingCard = ({ setting }: any) => (
    <div className={`flex items-start gap-4 p-5 rounded-[2rem] border-2 transition-all duration-300 ${settings[setting.id] ? "border-[#8faa8f] bg-[#8faa8f]/5" : "border-stone-100 bg-white"
      }`}>
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${settings[setting.id] ? "bg-[#8faa8f] text-white" : "bg-stone-50 text-stone-400"
        }`}>
        {/* İkon boyutu ayarlama */}
        {React.cloneElement(setting.icon, { className: "h-6 w-6" })}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-4 mb-1">
          <Label htmlFor={setting.id} className="text-lg font-bold text-stone-800 cursor-pointer">{setting.title}</Label>
          <Switch
            id={setting.id}
            checked={settings[setting.id]}
            onCheckedChange={() => handleToggle(setting.id)}
            className="data-[state=checked]:bg-[#8faa8f]"
          />
        </div>
        <p className="text-sm text-stone-500 font-medium leading-relaxed">{setting.description}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-8 bg-[#fdfdfb] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Ayarlar</h1>
          <p className="text-stone-400 font-medium mt-1">Vera'nın davranışlarını ve iş kurallarını belirleyin.</p>
        </div>
        {isSaving && (
          <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full animate-in fade-in">
            <Loader2 className="h-4 w-4 animate-spin text-stone-400" />
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Kaydediliyor...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Satış Ayarları */}
        <Card className="border-none bg-white shadow-sm ring-1 ring-stone-100 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-stone-50/50 border-b border-stone-100">
            <CardTitle className="text-xl font-bold text-stone-800 flex items-center gap-3">
              <Target className="h-6 w-6 text-[#8faa8f]" /> Satış Stratejisi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {settingsConfig.filter(s => s.category === "sales").map(s => <SettingCard key={s.id} setting={s} />)}
          </CardContent>
        </Card>

        {/* Bildirim ve Güvenlik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none bg-white shadow-sm ring-1 ring-stone-100 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-xl font-bold text-stone-800 flex items-center gap-3">
                <Bell className="h-6 w-6 text-orange-400" /> Bildirimler
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {settingsConfig.filter(s => s.category === "notification").map(s => <SettingCard key={s.id} setting={s} />)}
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm ring-1 ring-stone-100 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-xl font-bold text-stone-800 flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-400" /> Güvenlik & Kontrol
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {settingsConfig.filter(s => s.category === "security").map(s => <SettingCard key={s.id} setting={s} />)}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-[#8faa8f]/5 border border-dashed border-[#8faa8f]/30 rounded-[2rem]">
        <CheckCircle2 className="h-5 w-5 text-[#8faa8f] mr-3" />
        <p className="text-sm text-[#8faa8f] font-bold uppercase tracking-widest">
          Tüm değişiklikler anlık olarak Vera'nın hafızasına kaydedilir.
        </p>
      </div>
    </div>
  )
}