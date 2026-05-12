"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Package, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  Sparkles,
  Gift,
  Send
} from "lucide-react"
import { useState } from "react"

type Shipment = {
  id: string
  orderNo: string
  customer: string
  phone: string
  address: string
  status: "delivered" | "in_transit" | "delayed" | "preparing"
  carrier: string
  trackingNo: string
  estimatedDate: string
  veraAction?: string
}

const shipments: Shipment[] = [
  {
    id: "1",
    orderNo: "#1247",
    customer: "Fatma Yilmaz",
    phone: "0532 *** 45 67",
    address: "Kadikoy, Istanbul",
    status: "delayed",
    carrier: "Yurtici Kargo",
    trackingNo: "YK789456123",
    estimatedDate: "Gecikti (2 gun)",
    veraAction: "Ozur mesaji ve %5 indirim kuponu gonderildi"
  },
  {
    id: "2",
    orderNo: "#1246",
    customer: "Ali Demir",
    phone: "0544 *** 89 01",
    address: "Besiktas, Istanbul",
    status: "in_transit",
    carrier: "Aras Kargo",
    trackingNo: "AR456789012",
    estimatedDate: "Yarin teslim"
  },
  {
    id: "3",
    orderNo: "#1245",
    customer: "Zeynep Kaya",
    phone: "0555 *** 23 45",
    address: "Uskudar, Istanbul",
    status: "delivered",
    carrier: "MNG Kargo",
    trackingNo: "MNG123456789",
    estimatedDate: "Teslim edildi"
  },
  {
    id: "4",
    orderNo: "#1244",
    customer: "Mustafa Ozturk",
    phone: "0533 *** 67 89",
    address: "Bakirkoy, Istanbul",
    status: "preparing",
    carrier: "Henuz belirlenmedi",
    trackingNo: "-",
    estimatedDate: "Bugun kargoya verilecek"
  }
]

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
    label: "Hazirlaniyor", 
    color: "bg-amber-500 text-white",
    icon: Package,
    bgColor: "bg-amber-50 border-amber-200"
  }
}

export default function CargoPage() {
  const [sendingCoupon, setSendingCoupon] = useState<string | null>(null)

  const delayedCount = shipments.filter(s => s.status === "delayed").length
  const inTransitCount = shipments.filter(s => s.status === "in_transit").length
  const deliveredToday = shipments.filter(s => s.status === "delivered").length

  const handleSendCoupon = (id: string) => {
    setSendingCoupon(id)
    setTimeout(() => {
      setSendingCoupon(null)
    }, 1500)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Truck className="h-5 w-5 text-blue-600" />
          </div>
          Kargo Takip Paneli
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Tum gonderilerinizi takip edin, gecikmeler icin Vera otomatik bildirim atar
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-[#e2e8e2] bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{delayedCount}</p>
              <p className="text-sm text-muted-foreground">Geciken Kargo</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#e2e8e2] bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{inTransitCount}</p>
              <p className="text-sm text-muted-foreground">Yolda</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#e2e8e2] bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#8faa8f]/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#8faa8f]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#8faa8f]">{deliveredToday}</p>
              <p className="text-sm text-muted-foreground">Bugun Teslim</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proactive Info Card */}
      <Card className="border-2 border-[#b87333]/30 bg-[#b87333]/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#b87333] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Proaktif Musteri Iletisimi</h3>
              <p className="text-muted-foreground mt-1">
                Kargo geciktiginde Vera otomatik olarak musteriye ozur mesaji ve telafi kuponu gonderir. 
                Isletmeniz "savunmaci" degil "proaktif" gorunur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipments List */}
      <Card className="border border-[#e2e8e2] bg-white">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold">Gonderi Listesi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {shipments.map((shipment) => {
            const config = statusConfig[shipment.status]
            const StatusIcon = config.icon
            
            return (
              <div
                key={shipment.id}
                className={`p-4 md:p-5 rounded-xl border-2 ${config.bgColor} transition-all`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Status & Order Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-foreground text-lg">{shipment.orderNo}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-foreground">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {shipment.customer}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {shipment.phone}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {shipment.address}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {shipment.estimatedDate}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium">{shipment.carrier}</span>
                        {shipment.trackingNo !== "-" && (
                          <span className="ml-2">• Takip: {shipment.trackingNo}</span>
                        )}
                      </div>
                      
                      {/* Vera Action Badge */}
                      {shipment.veraAction && (
                        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-[#8faa8f]/10 rounded-lg">
                          <Sparkles className="h-4 w-4 text-[#8faa8f]" />
                          <span className="text-sm text-[#8faa8f] font-medium">{shipment.veraAction}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions for Delayed */}
                  {shipment.status === "delayed" && !shipment.veraAction && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSendCoupon(shipment.id)}
                        disabled={sendingCoupon === shipment.id}
                        className="h-11 px-4 bg-[#b87333] hover:bg-[#a06328] text-white rounded-xl"
                      >
                        {sendingCoupon === shipment.id ? (
                          <>
                            <Send className="h-4 w-4 mr-2 animate-pulse" />
                            Gonderiliyor...
                          </>
                        ) : (
                          <>
                            <Gift className="h-4 w-4 mr-2" />
                            Kupon Gonder
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
