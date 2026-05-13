"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot, MessageSquare, ShoppingCart, Package, CheckCircle2,
  Clock, Mic, Volume2, Sparkles, Loader2, ExternalLink, AlertCircle, Activity
} from "lucide-react"

// --- İKON BİLEŞENLERİ ---
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// --- YARDIMCI BİLEŞENLER ---
function StatCard({ icon, bg, value, label, isPurple }: any) {
  return (
    <Card className={`border ${isPurple ? 'border-purple-200 bg-purple-50/30' : 'border-stone-100 bg-white'} shadow-sm transition-all hover:shadow-md`}>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <div>
          <p className={`text-xl font-bold ${isPurple ? 'text-purple-700' : 'text-stone-800'}`}>{value}</p>
          <p className={`text-[11px] font-semibold uppercase tracking-wider ${isPurple ? 'text-purple-600' : 'text-stone-400'}`}>{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LiveFeedPage() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setActivities(data || [])
      } catch (err) {
        console.error("Akış çekilemedi:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()

    const channel = supabase
      .channel('live_activities')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activities' }, (payload) => {
        setActivities(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const stats = {
    instagram: activities.filter(a => a.platform === "instagram").length,
    whatsapp: activities.filter(a => a.platform === "whatsapp").length,
    voice: activities.filter(a => a.is_voice).length,
    orders: activities.filter(a => a.type === "order").length,
    total: activities.length
  }

  const getTypeIcon = (type: string, isVoice?: boolean) => {
    if (isVoice) return <Mic className="h-4 w-4" />
    switch (type) {
      case "order": return <ShoppingCart className="h-4 w-4" />
      case "message": return <MessageSquare className="h-4 w-4" />
      case "inquiry": return <MessageSquare className="h-4 w-4" />
      case "stock": return <Package className="h-4 w-4" />
      default: return <Bot className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string, isVoice?: boolean) => {
    if (isVoice) return "bg-purple-100 text-purple-700 border-purple-200"
    switch (type) {
      case "order": return "bg-green-50 text-green-700 border-green-100"
      case "message": return "bg-blue-50 text-blue-700 border-blue-100"
      case "inquiry": return "bg-stone-50 text-stone-700 border-stone-200"
      case "stock": return "bg-orange-50 text-orange-700 border-orange-100"
      default: return "bg-stone-50 text-stone-500 border-stone-100"
    }
  }

  const handleVoicePlay = async (url: string, id: string) => {
    try {
      if (playingVoice === id) {
        setPlayingVoice(null)
        return
      }
      setPlayingVoice(id)
      const audio = new Audio(url)
      await audio.play()
      audio.onended = () => setPlayingVoice(null)
    } catch (err) {
      console.error("Ses çalınamadı:", err)
      setPlayingVoice(null)
    }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#fdfdfb]">
      <div className="text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#8faa8f] mx-auto" />
        <p className="text-stone-400 font-bold animate-pulse text-xs tracking-widest uppercase">Vera Canlı Akışa Bağlanıyor...</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-8 bg-[#fdfdfb] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Vera Canlı Akış</h1>
        <p className="text-stone-400 font-medium mt-1">
          Müşterilerinizle yapılan tüm yapay zeka etkileşimlerini anlık takip edin.
        </p>
      </div>

      <Card className="border-2 border-purple-100 bg-purple-50/30 rounded-[2rem] overflow-hidden">
        <CardContent className="p-6 flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-200 text-white">
            <Mic className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2 uppercase tracking-wide">
              Sesli Mesaj Analizi
              <span className="text-[10px] bg-white text-purple-600 px-2 py-0.5 rounded-full border border-purple-200 font-black">AI WHISPER</span>
            </h3>
            <p className="text-purple-700/60 text-sm font-medium leading-relaxed">
              Vera artık sesli mesajlardaki şiveleri ve esnaf jargonunu anlayıp siparişe dönüştürüyor.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={<InstagramIcon className="h-5 w-5 text-white" />} bg="bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]" value={stats.instagram} label="Instagram" />
        <StatCard icon={<WhatsAppIcon className="h-5 w-5 text-white" />} bg="bg-[#25D366]" value={stats.whatsapp} label="WhatsApp" />
        <StatCard icon={<Mic className="h-5 w-5 text-white" />} bg="bg-purple-500" value={stats.voice} label="Sesli Mesaj" isPurple />
        <StatCard icon={<ShoppingCart className="h-5 w-5 text-green-700" />} bg="bg-green-100" value={stats.orders} label="Siparişler" />
        <StatCard icon={<Bot className="h-5 w-5 text-[#8faa8f]" />} bg="bg-[#8faa8f]/10" value={stats.total} label="Etkileşim" />
      </div>

      <Card className="border-none bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
        <CardHeader className="border-b border-stone-50 pb-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3 text-stone-800">
            <Activity className="h-6 w-6 text-[#8faa8f]" /> Akış Görüntüleyici
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          <div className="relative">
            {activities.length > 0 ? (
              <>
                <div className="absolute left-6 md:left-7 top-0 bottom-0 w-px bg-stone-100" />
                <div className="space-y-10">
                  {activities.map((activity) => (
                    <div key={activity.id} className="relative flex gap-6 group animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform group-hover:scale-110 ${activity.platform === "instagram" ? "bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]" : "bg-[#25D366]"
                          }`}>
                          {activity.platform === "instagram" ? <InstagramIcon className="h-6 w-6 text-white" /> : <WhatsAppIcon className="h-6 w-6 text-white" />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className={`rounded-[2rem] rounded-tl-sm p-6 border transition-all ${activity.needs_attention ? "bg-orange-50/50 border-orange-200 shadow-orange-100/50" : "bg-[#fcfcfc] border-stone-100"
                          } ${activity.is_voice ? "border-purple-100" : ""}`}>

                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div className="flex gap-2">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getTypeColor(activity.type, activity.is_voice)}`}>
                                {getTypeIcon(activity.type, activity.is_voice)}
                                {activity.action}
                              </span>
                              {activity.needs_attention && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white shadow-sm">
                                  <AlertCircle className="h-3 w-3" /> MÜDAHALE GEREKLİ
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 uppercase">
                              <Clock className="h-3 w-3" /> {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex justify-between items-start mb-2 text-stone-800">
                            <h4 className="font-bold text-lg">{activity.customer_name}</h4>
                            {activity.order_id && (
                              <button className="text-[10px] font-bold text-[#8faa8f] flex items-center gap-1 hover:underline">
                                <ExternalLink className="h-3 w-3" /> SİPARİŞ #{activity.order_id}
                              </button>
                            )}
                          </div>

                          {activity.is_voice ? (
                            <div className="space-y-4">
                              <div onClick={() => activity.voice_url && handleVoicePlay(activity.voice_url, activity.id)} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-purple-100 cursor-pointer hover:shadow-md transition-all">
                                <button className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg">
                                  <Volume2 className={`h-6 w-6 ${playingVoice === activity.id ? "animate-pulse" : ""}`} />
                                </button>
                                <div className="flex-1 flex items-center gap-1 h-8">
                                  {[3, 6, 9, 5, 8, 4, 7, 2, 9, 5].map((h, i) => (
                                    <div key={i} className={`w-1 rounded-full ${playingVoice === activity.id ? "bg-purple-500" : "bg-purple-200"}`} style={{ height: `${h * 3}px` }} />
                                  ))}
                                </div>
                                <span className="text-xs font-black text-purple-600">{activity.voice_duration}</span>
                              </div>
                              <div className="p-5 bg-white/60 rounded-2xl border border-stone-100 relative">
                                <div className="flex items-center gap-2 mb-2">
                                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                                  <span className="text-[9px] font-black uppercase text-stone-400 tracking-[0.2em]">Yapay Zeka Çevirisi</span>
                                </div>
                                <p className="text-sm text-stone-600 italic font-medium leading-relaxed">"{activity.transcription}"</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-stone-500 font-medium leading-relaxed">{activity.details}</p>
                          )}

                          <div className={`mt-5 flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold ${activity.is_voice ? 'bg-purple-50 text-purple-700' : 'bg-[#8faa8f]/10 text-[#8faa8f]'}`}>
                            <Bot className="h-4 w-4" />
                            <span className="flex-1">Vera: {activity.is_voice ? 'Sesi analiz etti ve sipariş taslağı hazırladı.' : 'Otomatik yanıtlandı.'}</span>
                            <CheckCircle2 className="h-4 w-4 opacity-50 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-stone-50 rounded-[2rem] border border-dashed border-stone-200">
                <Bot className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Henüz bir aktivite bulunmuyor.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}