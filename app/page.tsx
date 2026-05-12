"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Sparkles, TrendingUp, Shield } from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <Image
                src="/vera-logo.png"
                alt="Vera Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold text-[#b87333]">VERA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#ozellikler" className="text-base text-foreground/70 hover:text-foreground transition-colors">
                Ozellikler
              </a>
              <a href="#hakkinda" className="text-base text-foreground/70 hover:text-foreground transition-colors">
                Hakkinda
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Hero Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Logo Large */}
              <div className="flex justify-center lg:justify-start mb-8">
                <Image
                  src="/vera-logo.png"
                  alt="Vera - Caliskan Ari"
                  width={280}
                  height={280}
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
                  priority
                />
              </div>

              {/* Slogan */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                <span className="text-[#b87333]">Dogru Satisin</span> ve{" "}
                <span className="text-[#8faa8f]">Buyumenin</span> Adresi
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Adim Adim KOBInizin Basari Yolculugu. Vera, sizin icin 7/24 calisan dijital asistaniniz.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <div className="flex items-center gap-2 bg-[#f0f4f0] px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#8faa8f]" />
                  <span className="text-sm font-medium text-foreground">Yapay Zeka Destekli</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f0f4f0] px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-[#8faa8f]" />
                  <span className="text-sm font-medium text-foreground">Satis Odakli</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f0f4f0] px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-[#8faa8f]" />
                  <span className="text-sm font-medium text-foreground">Guvenli</span>
                </div>
              </div>

              {/* Bee Story */}
              <div id="hakkinda" className="bg-gradient-to-br from-[#f8faf8] to-[#f0f4f0] rounded-2xl p-6 border border-[#e2e8e2]">
                <h3 className="text-lg font-semibold text-[#b87333] mb-3">Caliskan Ari Hikayesi</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Tirpki bir ari gibi, Vera da isletmeniz icin yorulmadan calisir. Siparisleri takip eder, 
                  musterilerinizle iletisim kurar ve sizin icin en iyi satis stratejilerini olusturur. 
                  Siz dinlenirken, Vera calisir!
                </p>
              </div>
            </div>

            {/* Right - Login Form */}
            <div className="order-1 lg:order-2">
              <Card className="w-full max-w-md mx-auto shadow-xl border border-[#e2e8e2] bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Giris Yap</h2>
                    <p className="text-base text-muted-foreground">Hesabiniza erisim saglayin</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-foreground">
                        E-posta Adresi
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="ornek@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12 h-14 text-base rounded-xl border-2 border-[#e2e8e2] focus:border-[#8faa8f] transition-colors bg-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base font-medium text-foreground">
                        Sifre
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-12 pr-12 h-14 text-base rounded-xl border-2 border-[#e2e8e2] focus:border-[#8faa8f] transition-colors bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? "Sifreyi gizle" : "Sifreyi goster"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button type="button" className="text-sm text-[#8faa8f] hover:text-[#6b8e6b] font-medium transition-colors">
                        Sifremi Unuttum
                      </button>
                    </div>

                    {/* Login Button - Sage Green */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-[#8faa8f] hover:bg-[#7a9a7a] text-white"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Giris Yapiliyor...
                        </span>
                      ) : (
                        "Giris Yap"
                      )}
                    </Button>
                  </form>

                  {/* Security Badge */}
                  <div className="mt-6 pt-6 border-t border-[#e2e8e2] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4 text-[#8faa8f]" />
                      <span className="text-sm text-muted-foreground">256-bit SSL ile guvenli baglanti</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="ozellikler" className="py-16 md:py-24 bg-[#fafbfa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Vera ile Neler Yapabilirsiniz?</h2>
              <p className="text-lg text-muted-foreground">Isletmenizi buyutmek icin ihtiyaciniz olan her sey</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8e2] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#f0f4f0] rounded-xl flex items-center justify-center mb-5">
                  <Sparkles className="w-7 h-7 text-[#8faa8f]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Akilli Satis Asistani</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Vera, musterilerinizle Instagram ve WhatsApp uzerinden otomatik iletisim kurar ve satis yapar.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8e2] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#f0f4f0] rounded-xl flex items-center justify-center mb-5">
                  <TrendingUp className="w-7 h-7 text-[#8faa8f]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Stok ve Urun Yonetimi</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Urunlerinizi kolayca yonetin, stok durumunu takip edin ve kritik stok uyarilari alin.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8e2] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#f0f4f0] rounded-xl flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 text-[#8faa8f]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Detayli Raporlar</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Gunluk satis ozetleri ve performans raporlari ile isletmenizi yakindan takip edin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-[#e2e8e2] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/vera-logo.png"
                  alt="Vera"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-bold text-[#b87333]">VERA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; 2024 Vera. Tum haklari saklidir.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
