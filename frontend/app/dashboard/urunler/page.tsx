"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, Package, Edit2, Trash2, Loader2, AlertCircle, Sparkles } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null) // Düzenleme modu için
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock_count: "",
    price: "",
    description: ""
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setProducts(data)
    setLoading(false)
  }

  // --- EKLEME VE GÜNCELLEME BİRLEŞTİRİLDİ ---
  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Lütfen en az ürün adı ve fiyatını doldur balım!")
      return
    }

    const productData = {
      name: newProduct.name,
      stock_count: parseInt(newProduct.stock_count) || 0,
      price: parseFloat(newProduct.price) || 0,
      description: newProduct.description
    }

    if (editingId) {
      // Güncelleme Modu
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingId)

      if (error) alert(error.message)
    } else {
      // Ekleme Modu
      const { error } = await supabase
        .from('products')
        .insert([productData])

      if (error) alert(error.message)
    }

    // Sıfırla ve Kapat
    setEditingId(null)
    setNewProduct({ name: "", stock_count: "", price: "", description: "" })
    setIsModalOpen(false)
    fetchProducts()
  }

  // Düzenleme Modunu Aç
  const openEditModal = (product: any) => {
    setEditingId(product.id)
    setNewProduct({
      name: product.name,
      stock_count: product.stock_count.toString(),
      price: product.price.toString(),
      description: product.description || ""
    })
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Bu ürünü Vera'nın hafızasından siliyoruz, emin misin?")) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) setProducts(products.filter(p => p.id !== id))
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Kritik", color: "text-red-600 bg-red-50 border-red-200" }
    if (stock <= 15) return { label: "Düşük", color: "text-amber-600 bg-amber-50 border-amber-200" }
    return { label: "Normal", color: "text-[#6b8e6b] bg-[#f0f4f0] border-[#d4ddd4]" }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-[#8faa8f]" />
    </div>
  )

  return (
    <div className="p-4 space-y-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800">Ürün Yönetimi</h1>
          <p className="text-stone-500 text-sm mt-1">Stokları ve Vera'ya vereceğin talimatları buradan yönetebilirsin.</p>
        </div>

        <Button
          onClick={() => {
            setEditingId(null)
            setNewProduct({ name: "", stock_count: "", price: "", description: "" })
            setIsModalOpen(true)
          }}
          className="bg-[#8faa8f] hover:bg-[#7a9a7a] text-white rounded-xl h-12"
        >
          <Plus className="h-5 w-5 mr-2" /> Yeni Ürün Ekle
        </Button>
      </div>

      {/* Modal (Dialog) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-stone-800">
              {editingId ? "Ürünü Güncelle" : "Yeni Ürün Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-stone-600">Ürün Adı</Label>
              <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="rounded-xl border-stone-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-600">Mevcut Stok</Label>
                <Input type="number" value={newProduct.stock_count} onChange={(e) => setNewProduct({ ...newProduct, stock_count: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-600">Fiyat (TL)</Label>
                <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-600 font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#b87333]" /> Vera'ya Özel Not (AI Talimatı)
              </Label>
              <Input
                placeholder="Örn: Bu ürün biterse mutlaka WhatsApp'tan haber ver."
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="rounded-xl border-stone-200"
              />
            </div>
            <Button onClick={handleSaveProduct} className="w-full h-12 bg-[#8faa8f] hover:bg-[#7a9a7a] text-white rounded-xl font-bold transition-all">
              {editingId ? "Değişiklikleri Kaydet" : "Ürünü Hafızaya Ekle"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search */}
      <Card className="border-none bg-white shadow-sm ring-1 ring-stone-100 rounded-[2rem]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <Input placeholder="Vera'nın ürünlerinde ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 h-12 rounded-2xl border-none bg-stone-50 focus-visible:ring-[#8faa8f]" />
          </div>
        </CardContent>
      </Card>

      {/* Product List - Masaüstü Tablo */}
      <Card className="border-none bg-white shadow-sm ring-1 ring-stone-100 rounded-[2rem] overflow-hidden hidden lg:block">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50/50 text-stone-500 text-xs uppercase tracking-widest border-b border-stone-100">
                <th className="p-5 text-left font-bold">Ürün Bilgisi</th>
                <th className="p-5 text-center font-bold">Stok Durumu</th>
                <th className="p-5 text-center font-bold">Birim Fiyat</th>
                <th className="p-5 text-left font-bold">Vera Notu</th>
                <th className="p-5 text-right font-bold">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock_count)
                return (
                  <tr key={product.id} className="hover:bg-stone-50/30 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-stone-800">{product.name}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${stockStatus.color}`}>
                        {product.stock_count} {stockStatus.label}
                      </span>
                    </td>
                    <td className="p-5 text-center font-black text-stone-700">{product.price} TL</td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-stone-500 italic text-sm max-w-[200px] truncate">
                        {product.description || "Talimat yok."}
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(product)} className="hover:bg-blue-50 text-blue-500">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)} className="hover:bg-red-50 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Product List - Mobil Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock_count)
          return (
            <Card key={product.id} className="border-none shadow-sm ring-1 ring-stone-100 rounded-3xl">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-stone-800">{product.name}</h3>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(product)}><Edit2 className="h-4 w-4 text-blue-500" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${stockStatus.color}`}>
                    {product.stock_count} {stockStatus.label}
                  </span>
                  <span className="font-black text-stone-700">{product.price} TL</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl text-xs text-stone-500 italic">
                  <span className="font-bold text-[#b87333] non-italic tracking-tighter uppercase mr-1">Vera:</span>
                  {product.description || "Özel bir talimat verilmedi."}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}