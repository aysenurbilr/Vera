"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-stone-100 text-stone-900 relative overflow-hidden">
                {/* Dekoratif Arka Plan */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8faa8f]/5 rounded-bl-full"></div>

                <div className="flex flex-col items-center space-y-4 relative z-10">
                    <Link href="/">
                        <Image src="/vera-logo.png" alt="Vera" width={90} height={90} className="hover:scale-105 transition-transform" />
                    </Link>
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-stone-900">Vera KOBİ Paneli</h1>
                        <p className="text-stone-500 text-sm font-medium">Asistanınızı yönetmek için giriş yapın</p>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone-400">E-posta</Label>
                            <Input id="email" placeholder="esnaf@vera.com" className="h-12 rounded-xl border-stone-200 focus:ring-[#8faa8f]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password text-xs font-bold uppercase tracking-wider text-stone-400">Şifre</Label>
                            <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-xl border-stone-200 focus:ring-[#8faa8f]" />
                        </div>
                    </div>

                    <Button asChild className="w-full bg-[#8faa8f] hover:bg-[#7a947a] text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-[#8faa8f]/20">
                        <Link href="/dashboard">Sisteme Giriş Yap</Link>
                    </Button>
                </div>

                <div className="pt-6 flex justify-center items-center gap-2 text-stone-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Güvenli Esnaf Altyapısı</span>
                </div>
            </div>
        </div>
    )
}