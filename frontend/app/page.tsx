import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Bot, Truck, LineChart, MessageSquareText, Warehouse,
  ArrowRight, CheckCircle2, ShieldCheck, Zap
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9]">
      {/* --- NAV BAR --- */}
      <nav className="h-20 px-6 lg:px-12 flex items-center justify-between bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/vera-logo.png" alt="Vera" width={38} height={38} />
          <span className="text-2xl font-bold tracking-tight text-[#b87333]">VERA</span>
        </Link>
        <Button asChild className="bg-[#b87333] hover:bg-[#a0622a] text-white rounded-full px-8 shadow-sm transition-all hover:scale-105">
          <Link href="/login">Giriş Yap</Link>
        </Button>
      </nav>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative py-20 lg:py-32 px-6 overflow-hidden">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f1] px-4 py-1.5 text-sm font-semibold text-[#8faa8f] border border-[#8faa8f]/20">
                <Zap className="w-4 h-4 fill-current" />
                Yapay Zeka Destekli KOBİ Devrimi
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-stone-900 leading-[1.1] tracking-tight">
                Zanaatın <span className="text-[#b87333]">Dijital</span> <br />Savunma Hattı.
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed max-w-[500px]">
                Vera, el emeğiyle üretim yapan KOBİ'lerin operasyonel yükünü sırtlanır. Siz dinlenirken Vera çalışır, satışlarınızı ve stoğunuzu yönetir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#b87333] hover:bg-[#a0622a] text-white rounded-xl h-14 px-8 text-lg shadow-lg">
                  <Link href="/login">Hemen Giriş Yap <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <div className="flex items-center gap-4 text-stone-500 font-medium px-2">
                  <CheckCircle2 className="text-[#8faa8f] w-5 h-5" />
                  <span>7/24 Aktif Asistan</span>
                </div>
              </div>
            </div>

            {/* ÇALIŞKAN ARI VE LOGO HİKAYESİ */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#b87333] to-[#8faa8f] rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white border border-stone-100 p-12 rounded-[3rem] shadow-2xl space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping bg-[#8faa8f]/10 rounded-full"></div>
                    <Image src="/vera-logo.png" alt="Vera" width={180} height={180} className="relative z-10 drop-shadow-2xl" />
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h3 className="text-[#b87333] font-black uppercase tracking-[0.2em] text-xs">Vera'nın Çalışkan Arısı</h3>
                  <p className="text-stone-600 italic leading-relaxed text-lg">
                    "Tıpkı bir arı gibi, Vera da işletmeniz için yorulmadan çalışır. Siz dinlenirken o siparişleri toplar, müşteriyi yanıtlar ve emeğinizi teknolojiyle korur."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TEKNİK ÇÖZÜMLER (BENTO GRID UPGRADE) --- */}
        <section className="py-24 bg-stone-100 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* 1. Müşteri İletişimi (Large) */}
              <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all border-b-4 border-b-[#8faa8f]">
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#f1f5f1] rounded-2xl flex items-center justify-center">
                    <MessageSquareText className="text-[#8faa8f] w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-stone-900">Yapay Zeka Ajanları</h3>
                  <p className="text-stone-500 text-lg">Müşterinin "Kargom nerede?" veya "Fiyat ne?" sorularını RAG teknolojisiyle saniyeler içinde, insan müdahalesi olmadan yanıtlar.</p>
                </div>
                <div className="mt-8 flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-mono text-stone-400 font-medium">Vera Agent is typing...</span>
                </div>
              </div>

              {/* 2. Kargo (Small) */}
              <div className="md:col-span-4 bg-[#b87333] p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-lg">
                <Truck className="w-12 h-12" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Proaktif Kargo</h3>
                  <p className="text-stone-100/70 text-sm">Gecikmeleri sistemden önce fark eder, müşteriye bilgi geçer.</p>
                </div>
              </div>

              {/* 3. Stok (Medium) */}
              <div className="md:col-span-6 bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm flex items-start gap-6 hover:border-[#b87333] transition-colors">
                <Warehouse className="w-12 h-12 text-[#b87333] shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Akıllı Envanter</h3>
                  <p className="text-stone-500 text-sm">Stok kritik seviyeye indiğinde tedarikçiye otomatik taslak mail hazırlar.</p>
                </div>
              </div>

              {/* 4. Analiz (Medium) */}
              <div className="md:col-span-6 bg-[#8faa8f] p-10 rounded-[2.5rem] text-white flex items-start gap-6 shadow-md">
                <LineChart className="w-12 h-12 shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">İçgörü Üretimi</h3>
                  <p className="text-stone-100/80 text-sm">Geçmiş satış trendlerini analiz ederek gelecek haftanın stok ihtiyacını öngörür.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- TARGET AUDIENCE --- */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-4xl text-center space-y-12">
            <h2 className="text-3xl font-bold italic text-stone-800">"Vera, el emeğinin teknolojiyle buluştuğu o akıllı merkezdir."</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Kooperatifler", "El Sanatları", "Butik Üreticiler", "Yerel Gıda"].map((tag) => (
                <span key={tag} className="px-6 py-2 rounded-full border border-stone-200 text-stone-500 font-medium hover:bg-[#b87333] hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12  bg-[#b5c9b6] px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Image src="/vera-logo.png" alt="Vera" width={32} height={32} className="brightness-200" />
            <span className="text-black font-bold text-xl tracking-tight">VERA</span>
          </div>
          <p className="text-stone-500 text-sm">© 2026 Vera AI. KOBİ'lerin yerel gücü için geliştirildi.</p>
        </div>
      </footer>
    </div>
  )
}