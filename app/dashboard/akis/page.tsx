"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, ShoppingCart, Package, CheckCircle2, Clock, Mic, Volume2, Sparkles } from "lucide-react"
import { useState } from "react"

// Instagram and WhatsApp icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface ActivityItem {
  id: number
  platform: "instagram" | "whatsapp"
  type: "message" | "order" | "inquiry" | "stock" | "voice"
  customerName: string
  action: string
  details: string
  time: string
  status: "completed" | "pending"
  isVoice?: boolean
  voiceDuration?: string
  transcription?: string
}

const activities: ActivityItem[] = [
  {
    id: 1,
    platform: "whatsapp",
    type: "voice",
    customerName: "Huseyin Amca",
    action: "Sesli mesaj algilandi",
    details: "Vera sesi metne cevirdi ve yanitladi",
    time: "1 dakika once",
    status: "completed",
    isVoice: true,
    voiceDuration: "0:23",
    transcription: "Oglum su zeytinyagindan 2 tane gonderir misin? Gecen aldim cok guzeldi. Bir de bal vardi yanlis hatirlamiyorsam, ondan da 1 tane olsun."
  },
  {
    id: 2,
    platform: "whatsapp",
    type: "order",
    customerName: "Mehmet Bey",
    action: "Siparis alindi",
    details: "2x Organik Zeytinyagi, 1x Dogal Bal siparis onaylandi. Toplam: 1.180 TL",
    time: "5 dakika once",
    status: "completed"
  },
  {
    id: 3,
    platform: "instagram",
    type: "inquiry",
    customerName: "Ayse Hanim",
    action: "Urun sorusu yanitlandi",
    details: "Zeytinyaginin mensesi hakkinda bilgi verildi. Musteri ilgileniyor.",
    time: "8 dakika once",
    status: "completed"
  },
  {
    id: 4,
    platform: "whatsapp",
    type: "voice",
    customerName: "Zehra Teyze",
    action: "Sesli mesaj algilandi",
    details: "Vera sesi metne cevirdi ve yanitladi",
    time: "12 dakika once",
    status: "completed",
    isVoice: true,
    voiceDuration: "0:18",
    transcription: "Kizim ben o recelden istiyorum ama seker mi var icinde? Sekerli olmasin benim icin."
  },
  {
    id: 5,
    platform: "whatsapp",
    type: "message",
    customerName: "Ali Bey",
    action: "Fiyat bilgisi verildi",
    details: "Toptan bal fiyatlari ve kargo bilgisi paylasildi.",
    time: "15 dakika once",
    status: "completed"
  },
  {
    id: 6,
    platform: "instagram",
    type: "order",
    customerName: "Fatma Hanim",
    action: "Siparis talebi alindi",
    details: "5x Ev Yapimi Recel siparisi icin onay bekleniyor.",
    time: "22 dakika once",
    status: "pending"
  },
  {
    id: 7,
    platform: "whatsapp",
    type: "stock",
    customerName: "Sistem",
    action: "Stok uyarisi gonderildi",
    details: "Organik Zeytinyagi kritik stok seviyesine ulasti. Tedarikciye bilgi verildi.",
    time: "35 dakika once",
    status: "completed"
  },
]

export default function LiveFeedPage() {
  const [playingVoice, setPlayingVoice] = useState<number | null>(null)

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
      case "order": return "bg-[#e8f5e8] text-[#2e7d32] border-[#c8e6c9]"
      case "message": return "bg-[#e3f2fd] text-[#1565c0] border-[#bbdefb]"
      case "inquiry": return "bg-[#f3e5f5] text-[#7b1fa2] border-[#e1bee7]"
      case "stock": return "bg-[#b87333]/10 text-[#b87333] border-[#b87333]/20"
      default: return "bg-[#f5f5f5] text-[#616161] border-[#e0e0e0]"
    }
  }

  const handlePlayVoice = (id: number) => {
    setPlayingVoice(playingVoice === id ? null : id)
  }

  const voiceCount = activities.filter(a => a.isVoice).length

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Vera Canli Akis</h1>
        <p className="text-muted-foreground text-base md:text-lg mt-1">
          Veranin musterilerinizle yaptigi tum etkilesimler
        </p>
      </div>

      {/* Voice Feature Highlight */}
      <Card className="border-2 border-purple-200 bg-purple-50/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                Sesli Mesaj Destegi
                <span className="text-xs px-2 py-0.5 bg-purple-500 text-white rounded-full">Yeni</span>
              </h3>
              <p className="text-muted-foreground mt-1">
                Vera artik sesli mesajlari anlıyor! OpenAI Whisper ile sesi metne ceviriyor ve 
                esnafın dilinden anlayarak yanit veriyor. Orta yasli musterileriniz rahatca sesli mesaj atabilir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45] flex items-center justify-center">
              <InstagramIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Instagram</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#25D366] flex items-center justify-center">
              <WhatsAppIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">38</p>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/30 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-700">{voiceCount}</p>
              <p className="text-sm text-purple-600">Sesli Mesaj</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#e8f5e8] flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-[#2e7d32]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Siparis</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#e2e8e2] bg-white shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <Bot className="h-6 w-6 text-[#8faa8f]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">64</p>
              <p className="text-sm text-muted-foreground">Toplam</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat-like Timeline */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
            <Bot className="h-5 w-5 md:h-6 md:w-6 text-[#8faa8f]" />
            Etkilesim Akisi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {/* Timeline Container */}
          <div className="relative">
            {/* Thin Vertical Line */}
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-[#e2e8e2]" />
            
            {/* Timeline Items - Chat Bubbles */}
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="relative flex gap-4 md:gap-5">
                  {/* Platform Icon - Small Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div 
                      className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center shadow-sm ${
                        activity.platform === "instagram" 
                          ? "bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]" 
                          : "bg-[#25D366]"
                      }`}
                    >
                      {activity.platform === "instagram" ? (
                        <InstagramIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      ) : (
                        <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      )}
                    </div>
                  </div>
                  
                  {/* Chat Bubble Content */}
                  <div className="flex-1 pb-2">
                    <div className={`rounded-2xl rounded-tl-sm p-4 md:p-5 border shadow-sm ${
                      activity.isVoice 
                        ? "bg-purple-50/50 border-purple-200" 
                        : "bg-[#fafbfa] border-[#e8ede8]"
                    }`}>
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(activity.type, activity.isVoice)}`}>
                          {getTypeIcon(activity.type, activity.isVoice)}
                          {activity.action}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {activity.status === "completed" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#8faa8f]" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 text-[#b87333]" />
                          )}
                          {activity.status === "completed" ? "Tamamlandi" : "Bekliyor"}
                        </span>
                      </div>
                      
                      {/* Customer Name */}
                      <p className="font-semibold text-base text-foreground mb-1">
                        {activity.customerName}
                      </p>

                      {/* Voice Message Special UI */}
                      {activity.isVoice && (
                        <div className="mb-3">
                          {/* Audio Player Simulation */}
                          <div 
                            onClick={() => handlePlayVoice(activity.id)}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors"
                          >
                            <button className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 hover:bg-purple-600 transition-colors">
                              <Volume2 className={`h-5 w-5 text-white ${playingVoice === activity.id ? "animate-pulse" : ""}`} />
                            </button>
                            {/* Waveform Simulation */}
                            <div className="flex-1 flex items-center gap-0.5 h-8">
                              {[3, 5, 8, 4, 7, 9, 6, 4, 8, 5, 3, 6, 8, 4, 7, 5, 3, 6, 4, 8].map((h, i) => (
                                <div 
                                  key={i} 
                                  className={`w-1 rounded-full transition-all ${
                                    playingVoice === activity.id ? "bg-purple-500" : "bg-purple-300"
                                  }`}
                                  style={{ height: `${h * 3}px` }}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-purple-600">{activity.voiceDuration}</span>
                          </div>

                          {/* Transcription */}
                          <div className="mt-3 p-3 bg-white rounded-xl border border-[#e2e8e2]">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="h-4 w-4 text-[#b87333]" />
                              <span className="text-xs font-medium text-[#b87333]">Whisper Transkripsiyonu</span>
                            </div>
                            <p className="text-sm text-foreground italic">"{activity.transcription}"</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Details */}
                      {!activity.isVoice && (
                        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                          {activity.details}
                        </p>
                      )}

                      {activity.isVoice && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#8faa8f]/10 rounded-lg">
                          <Sparkles className="h-4 w-4 text-[#8faa8f]" />
                          <span className="text-sm text-[#8faa8f] font-medium">
                            Vera otomatik yanit gonderdi: "Tabii efendim, siparisi hemen hazirliyorum!"
                          </span>
                        </div>
                      )}
                      
                      {/* Time */}
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
