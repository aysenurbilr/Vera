"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Check, 
  X, 
  Percent, 
  MessageSquare,
  Gift,
  Clock,
  User,
  Sparkles
} from "lucide-react"

type PendingAction = {
  id: string
  type: "discount" | "reply" | "campaign"
  customer: string
  platform: "WhatsApp" | "Instagram"
  message: string
  suggestedAction: string
  value?: string
  time: string
  urgency: "high" | "medium" | "low"
}

const pendingActions: PendingAction[] = [
  {
    id: "1",
    type: "discount",
    customer: "Ayse Hanim",
    platform: "WhatsApp",
    message: "Cok begendim ama biraz pahali, indirim yapar misiniz?",
    suggestedAction: "Vera %15 indirim teklif etmek istiyor",
    value: "%15",
    time: "2 dk once",
    urgency: "high"
  },
  {
    id: "2",
    type: "reply",
    customer: "Mehmet Bey",
    platform: "Instagram",
    message: "Bu urun ne zaman gelir?",
    suggestedAction: "Vera stok bilgisi ve tahmini teslimat tarihi paylasacak",
    time: "8 dk once",
    urgency: "medium"
  },
  {
    id: "3",
    type: "campaign",
    customer: "Genel Kampanya",
    platform: "WhatsApp",
    message: "Son 7 gunde alisveris yapmayan musterilere",
    suggestedAction: "Vera toplu mesaj gondermek istiyor: 'Sizi ozledik! %10 indirim kuponunuz hazir'",
    value: "127 kisi",
    time: "15 dk once",
    urgency: "low"
  }
]

export default function ApprovalsPage() {
  const [actions, setActions] = useState(pendingActions)
  const [processing, setProcessing] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setProcessing(id)
    setTimeout(() => {
      setActions(actions.filter(a => a.id !== id))
      setProcessing(null)
    }, 800)
  }

  const handleReject = (id: string) => {
    setActions(actions.filter(a => a.id !== id))
  }

  const getIcon = (type: string) => {
    switch(type) {
      case "discount": return <Percent className="h-5 w-5" />
      case "reply": return <MessageSquare className="h-5 w-5" />
      case "campaign": return <Gift className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case "high": return "border-l-red-500 bg-red-50/30"
      case "medium": return "border-l-amber-500 bg-amber-50/30"
      case "low": return "border-l-[#8faa8f] bg-[#f8faf8]"
      default: return "border-l-gray-300"
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#b87333]/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-[#b87333]" />
            </div>
            Onay Bekleyen Aksiyonlar
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mt-2">
            Vera sizin icin bu aksiyonlari onerdi - onayinizi bekliyor
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-[#8faa8f]/10 rounded-xl">
          <Sparkles className="h-5 w-5 text-[#8faa8f]" />
          <span className="text-sm font-medium text-[#8faa8f]">
            {actions.length} aksiyon bekliyor
          </span>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-2 border-[#8faa8f]/30 bg-[#8faa8f]/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#8faa8f] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Human-in-the-Loop</h3>
              <p className="text-muted-foreground mt-1">
                Vera onemli kararlarda sizin onayinizi alir. Boylece kontrol her zaman sizde kalir, 
                Vera sadece is yukunu azaltir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      {actions.length === 0 ? (
        <Card className="border border-[#e2e8e2]">
          <CardContent className="py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-[#8faa8f]/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#8faa8f]" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Tum aksiyonlar tamamlandi!</h3>
            <p className="text-muted-foreground mt-2">
              Yeni onay gerektiren bir islem oldugunda burada gorunecek.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {actions.map((action) => (
            <Card 
              key={action.id} 
              className={`border-l-4 transition-all duration-300 ${getUrgencyColor(action.urgency)} ${
                processing === action.id ? "scale-95 opacity-50" : ""
              }`}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Left - Icon & Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      action.type === "discount" ? "bg-[#b87333]/10 text-[#b87333]" :
                      action.type === "campaign" ? "bg-purple-100 text-purple-600" :
                      "bg-[#8faa8f]/10 text-[#8faa8f]"
                    }`}>
                      {getIcon(action.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Customer & Platform */}
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{action.customer}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          action.platform === "WhatsApp" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-pink-100 text-pink-700"
                        }`}>
                          {action.platform}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {action.time}
                        </span>
                      </div>
                      
                      {/* Original Message */}
                      <div className="bg-white/80 rounded-lg p-3 mb-3 border border-[#e2e8e2]">
                        <p className="text-sm text-muted-foreground italic">"{action.message}"</p>
                      </div>
                      
                      {/* Suggested Action */}
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#b87333]" />
                        <p className="text-base font-medium text-foreground">
                          {action.suggestedAction}
                        </p>
                        {action.value && (
                          <span className="px-2.5 py-1 bg-[#b87333] text-white text-sm font-bold rounded-lg">
                            {action.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right - Actions */}
                  <div className="flex items-center gap-3 lg:flex-col xl:flex-row">
                    <Button
                      onClick={() => handleApprove(action.id)}
                      disabled={processing === action.id}
                      className="flex-1 lg:w-full xl:w-auto h-12 px-6 bg-[#8faa8f] hover:bg-[#7a9a7a] text-white text-base font-semibold rounded-xl shadow-sm"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Onayla
                    </Button>
                    <Button
                      onClick={() => handleReject(action.id)}
                      variant="outline"
                      disabled={processing === action.id}
                      className="flex-1 lg:w-full xl:w-auto h-12 px-6 border-2 border-red-200 text-red-600 hover:bg-red-50 text-base font-semibold rounded-xl"
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
