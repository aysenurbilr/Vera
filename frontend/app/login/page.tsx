"use client"

import { useState } from "react" // Eklendi
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation" // Eklendi
import { supabase } from "@/lib/supabase" // Eklendi
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck, Loader2 } from "lucide-react" // Loader2 eklendi

export default function LoginPage() {
    // --- STATE YÖNETİMİ ---
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // --- GİRİŞ FONKSİYONU ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                alert("Giriş bilgileri hatalı: " + error.message)
            } else {
                // Giriş başarılıysa dashboard'a uçuruyoruz
                router.push("/dashboard")
            }
        } catch (err) {
            console.error("Beklenmedik hata:", err)
        } finally {
            setLoading(false)
        }
    }

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

                {/* Form Yapısı Eklendi */}
                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone-400">E-posta</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="esnaf@vera.com"
                                className="h-12 rounded-xl border-stone-200 focus:ring-[#8faa8f]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" title="password" className="text-xs font-bold uppercase tracking-wider text-stone-400">Şifre</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 rounded-xl border-stone-200 focus:ring-[#8faa8f]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#8faa8f] hover:bg-[#7a947a] text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-[#8faa8f]/20 transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Bağlanıyor...
                            </div>
                        ) : (
                            "Sisteme Giriş Yap"
                        )}
                    </Button>
                </form>

                <div className="pt-6 flex justify-center items-center gap-2 text-stone-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Güvenli Esnaf Altyapısı</span>
                </div>
            </div>
        </div>
    )
}