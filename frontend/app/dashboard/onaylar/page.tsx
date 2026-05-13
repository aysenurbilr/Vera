"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase" // Supabase bağlantın
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell, Check, X, Percent, MessageSquare,
  Gift, Clock, User, Sparkles, Loader2
} from "lucide-react"

export default function ApprovalsPage() {
  const [actions, setActions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)

  // VERİLERİ ÇEK (RAG tarafından oluşturulan öneriler)
  useEffect(() => {
    async function fetchPendingActions() {
      setLoading(true)
      const { data, error } = await supabase
        .from('pending_actions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (data) setActions(data)
      setLoading(false)
    }

    fetchPendingActions()

    // Realtime: RAG yeni bir öneri ürettiğinde sayfaya anında düşer
    const subscription = supabase
      .channel('rag_approvals')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pending_actions' }, payload => {
        setActions(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(subscription) }
  }, [])

  // ONAYLA (RAG Yanıtını Müşteriye Gönderir)
  const handleApprove = async (id: string) => {
    setProcessing(id)

    // Burada ileride RAG API'sine "bu yanıtı gönder" komutu tetiklenecek
    const { error } = await supabase
      .from('pending_actions')
      .update({ status: 'approved' })
      .eq('id', id)

    if (!error) {
      // Vera Akış (Activities) tablosuna da bir kayıt atabiliriz
      setActions(actions.filter(a => a.id !== id))
    }
    setProcessing(null)
  }

  // REDDET
  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from('pending_actions')
      .update({ status: 'rejected' })
      .eq('id', id)

    if (!error) {
      setActions(actions.filter(a => a.id !== id))
    }
  }

  // İkon ve Renk Yardımcıları
  const getIcon = (type: string) => {
    switch (type) {
      case "discount": return <Percent className="h-5 w-5" />
      case "reply": return <MessageSquare className="h-5 w-5" />
      case "campaign": return <Gift className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "border-l-red-500 bg-red-50/30"
      case "medium": return "border-l-amber-500 bg-amber-50/30"
      case "low": return "border-l-[#8faa8f] bg-[#f8faf8]"
      default: return "border-l-gray-300"
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-bold text-[#8faa8f]">
      <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Vera önerileri hazırlıyor...
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-8 bg-[#fafaf9] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-[#b87333]" />
            </div>
            Onay Bekleyen Aksiyonlar
          </h1>
          <p className="text-stone-500 mt-2">
            Vera RAG sistemi sizin için bu aksiyonları önerdi - onayınızı bekliyor
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#8faa8f]/10 rounded-xl border border-[#8faa8f]/20">
          <Sparkles className="h-5 w-5 text-[#8faa8f]" />
          <span className="text-sm font-bold text-[#8faa8f]">
            {actions.length} öneri var
          </span>
        </div>
      </div>

      {/* RAG Info Card */}
      <Card className="border-2 border-[#8faa8f]/30 bg-[#8faa8f]/5 rounded-[2rem] overflow-hidden shadow-sm">
        <CardContent className="p-4 md:p-6 flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#8faa8f] flex items-center justify-center flex-shrink-0 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#6b8e6b]">RAG Denetim Mekanizması</h3>
            <p className="text-stone-600/80 mt-1 text-sm font-medium leading-relaxed">
              Vera, ürünleriniz ve stoklarınızla ilgili (RAG) en doğru bilgiyi bulur ve bir yanıt taslağı hazırlar.
              Siz "Onayla" diyene kadar müşteriye hiçbir mesaj gitmez.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Aksiyon Listesi */}
      {actions.length === 0 ? (
        <Card className="border border-stone-200 rounded-[2.5rem] bg-white">
          <CardContent className="py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-6 border border-stone-100 shadow-inner">
              <Check className="h-10 w-10 text-[#8faa8f]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-800">Harika! Bekleyen iş kalmadı.</h3>
            <p className="text-stone-400 mt-2 font-medium italic">
              Vera yeni bir öneri sunduğunda burada belirecek.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {actions.map((action) => (
            <Card
              key={action.id}
              className={`border-none rounded-[2rem] shadow-sm ring-1 ring-stone-100 transition-all duration-500 overflow-hidden ${getUrgencyColor(action.urgency)} ${processing === action.id ? "scale-[0.98] opacity-50 grayscale" : ""
                }`}
            >
              <CardContent className="p-5 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Bilgi Kısmı */}
                  <div className="flex items-start gap-5 flex-1">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${action.type === "discount" ? "bg-orange-500 text-white" :
                      action.type === "campaign" ? "bg-purple-500 text-white" :
                        "bg-[#8faa8f] text-white"
                      }`}>
                      {getIcon(action.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-stone-100 shadow-sm">
                          <User className="h-3.5 w-3.5 text-stone-400" />
                          <span className="font-bold text-stone-700 text-sm">{action.customer_name}</span>
                        </div>
                        <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${action.platform === "WhatsApp" ? "bg-green-500 text-white" : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white"
                          }`}>
                          {action.platform}
                        </span>
                        <div className="text-[10px] font-bold text-stone-400 flex items-center gap-1 uppercase tracking-tighter">
                          <Clock className="h-3 w-3" />
                          {new Date(action.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-stone-100">
                        <p className="text-sm text-stone-500 italic leading-relaxed">"{action.message}"</p>
                      </div>

                      <div className="flex items-center gap-3 p-1">
                        <Sparkles className="h-5 w-5 text-orange-400 animate-pulse" />
                        <p className="text-lg font-bold text-stone-800 tracking-tight">
                          {action.suggest_action || action.suggested_action}
                        </p>
                        {action.value && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-black rounded-lg shadow-orange-200 shadow-lg">
                            {action.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="flex items-center gap-3 lg:flex-col xl:flex-row min-w-[280px]">
                    <Button
                      onClick={() => handleApprove(action.id)}
                      disabled={processing === action.id}
                      className="flex-1 h-14 px-8 bg-[#8faa8f] hover:bg-[#7a9a7a] text-white font-bold rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95"
                    >
                      {processing === action.id ? <Loader2 className="animate-spin h-5 w-5" /> : <Check className="h-5 w-5 mr-2" />}
                      Onayla
                    </Button>
                    <Button
                      onClick={() => handleReject(action.id)}
                      variant="outline"
                      disabled={processing === action.id}
                      className="flex-1 h-14 px-8 border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold rounded-2xl transition-all"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Reddet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}