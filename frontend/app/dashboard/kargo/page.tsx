"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Truck, Package, AlertTriangle, CheckCircle2,
  Clock, MapPin, User, Phone, Sparkles, Gift, Send, Loader2
} from "lucide-react" // Not: Lucide-react kullanıyorsan oradan import et

const statusConfig = {
  delivered: {
    label: "Teslim Edildi",
    color: "bg-[#8faa8f] text-white",
    icon: CheckCircle2,
    bgColor: "bg-[#8faa8f]/5 border-[#8faa8f]/20"
  },
  in_transit: {
    label: "Yolda",
    color: "bg-blue-500 text-white",
    icon: Truck,
    bgColor: "bg-blue-50 border-blue-200"
  },
  delayed: {
    label: "Gecikti",
    color: "bg-red-500 text-white",
    icon: AlertTriangle,
    bgColor: "bg-red-50 border-red-200"
  },
  preparing: {
    label: "Hazırlanıyor",
    color: "bg-amber-500 text-white",
    icon: Package,
    bgColor: "bg-amber-50 border-amber-200"
  }
}

export default function CargoPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingCoupon, setSendingCoupon] = useState<string | null>(null)

  // --- VERİLERİ ÇEK ---
  useEffect(() => {
    async function fetchCargoData() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (data) setShipments(data)
      } catch (err) {
        console.error("Kargo verisi çekilemedi:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCargoData()
  }, [])

  // --- İSTATİSTİKLER (Tek Seferde) ---
  const stats = {
    delayed: shipments.filter(s => s.status === "delayed").length,
    inTransit: shipments.filter(s => s.status === "in_transit").length,
    delivered: shipments.filter(s => s.status === "delivered").length
  }

  const handleSendCoupon = async (id: string) => {
    setSendingCoupon(id)
    const { error } = await supabase
      .from('orders')
      .update({ vera_action: "Özür mesajı ve %5 indirim kuponu gönderildi" })
      .eq('id', id)

    if (!error) {
      setShipments(shipments.map(s => s.id === id ? { ...s, vera_action: "Özür mesajı ve %5 indirim kuponu gönderildi" } : s))
    }
    setSendingCoupon(null)
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-[#8faa8f]" />
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-8 bg-[#fdfdfb] min-h-screen">

      {/* Üst Başlık */}
      <div>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight flex items-center gap-3">
          <Truck className="h-8 w-8 text-blue-500" /> Kargo Takip Paneli
        </h1>
        <p className="text-stone-500 mt-1">Tüm gönderilerinizi takip edin, gecikmeler için Vera otomatik bildirim atar.</p>
      </div>

      {/* Stats Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-red-100 bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.delayed}</p>
              <p className="text-sm text-muted-foreground font-medium">Geciken Kargo</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-blue-100 bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.inTransit}</p>
              <p className="text-sm text-muted-foreground font-medium">Yolda</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#8faa8f]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#8faa8f]">{stats.delivered}</p>
              <p className="text-sm text-muted-foreground font-medium">Bugün Teslim</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gönderi Listesi */}
      <Card className="border border-[#e2e8e2] bg-white rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="border-b border-stone-50">
          <CardTitle className="text-xl font-bold text-stone-800 tracking-tight">Gönderi Listesi</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {shipments.length > 0 ? (
            shipments.map((shipment) => {
              const statusKey = shipment.status || 'preparing'
              const config = (statusConfig as any)[statusKey] || statusConfig.preparing
              const StatusIcon = config.icon

              return (
                <div key={shipment.id} className={`p-5 rounded-[2rem] border-2 ${config.bgColor} transition-all`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-stone-800">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`h-12 w-12 rounded-2xl ${config.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-black text-xl tracking-tighter">#{shipment.id}</span>
                          <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${config.color}`}>
                            {config.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 font-bold"><User className="h-4 w-4 text-stone-400" /> {shipment.customer_name}</div>
                          <div className="flex items-center gap-2 font-medium"><Phone className="h-4 w-4 text-stone-400" /> {shipment.customer_phone || '-'}</div>
                          <div className="flex items-center gap-2 text-stone-500 italic"><MapPin className="h-4 w-4 text-stone-400" /> {shipment.customer_address || '-'}</div>
                          <div className="flex items-center gap-2 font-bold text-[#8faa8f]"><Clock className="h-4 w-4" /> {shipment.estimated_delivery || '-'}</div>
                        </div>

                        <div className="mt-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
                          {shipment.carrier || 'Kargo Bilgisi Yok'} • Takip: {shipment.tracking_code || '-'}
                        </div>

                        {shipment.vera_action && (
                          <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#8faa8f]/10 rounded-xl border border-[#8faa8f]/20 shadow-sm">
                            <Sparkles className="h-4 w-4 text-[#8faa8f]" />
                            <span className="text-xs text-[#8faa8f] font-bold">{shipment.vera_action}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {statusKey === "delayed" && !shipment.vera_action && (
                      <Button
                        onClick={() => handleSendCoupon(shipment.id)}
                        disabled={sendingCoupon === shipment.id}
                        className="bg-[#b87333] hover:bg-[#a06328] text-white rounded-[1.5rem] px-6 h-12 font-bold shadow-lg shadow-orange-100"
                      >
                        {sendingCoupon === shipment.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Gift className="h-4 w-4 mr-2" />}
                        Kupon Gönder
                      </Button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-20 text-stone-400 font-medium italic">
              Henüz kargo kaydı bulunmuyor balım.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}