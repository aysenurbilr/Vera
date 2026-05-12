"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Package,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const menuItems = [
  { href: "/dashboard", label: "Anasayfa", icon: Home },
  { href: "/dashboard/onaylar", label: "Onay Bekleyenler", icon: Bell, badge: 3 },
  { href: "/dashboard/kargo", label: "Kargo Takip", icon: Truck },
  { href: "/dashboard/urunler", label: "Urunler", icon: Package },
  { href: "/dashboard/akis", label: "Vera Akis", icon: Activity },
  { href: "/dashboard/ayarlar", label: "Ayarlar", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden h-12 w-12 rounded-xl bg-white shadow-lg border border-[#e2e8e2]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Menuyu Kapat" : "Menuyu Ac"}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Slim & Elegant */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-[#e8ede8] z-50 transition-transform duration-300 lg:translate-x-0 flex flex-col",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area - Compact */}
        <div className="p-5 border-b border-[#e8ede8]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/vera-logo.png"
              alt="Vera"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-[#b87333]">VERA</h1>
              <p className="text-xs text-muted-foreground">KOBI Asistani</p>
            </div>
          </Link>
        </div>

        {/* Navigation - Clean */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 relative",
                  isActive
                    ? "bg-[#8faa8f] text-white shadow-sm"
                    : "text-foreground hover:bg-[#f5f7f5]"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "absolute right-3 min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-xs font-bold",
                    isActive ? "bg-white text-[#8faa8f]" : "bg-[#b87333] text-white"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section - Minimal */}
        <div className="p-3 border-t border-[#e8ede8]">
          <div className="flex items-center gap-3 mb-3 px-3 py-2.5 bg-[#f8faf8] rounded-xl">
            <div className="w-9 h-9 rounded-full bg-[#8faa8f] flex items-center justify-center text-white font-semibold text-sm">
              E
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Esnaf Dukkani</p>
              <p className="text-xs text-muted-foreground truncate">info@esnaf.com</p>
            </div>
          </div>
          
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Cikis Yap</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
