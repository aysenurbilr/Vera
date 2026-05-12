"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase" // Bağlantı dosyamız
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Package, Edit2, Trash2, Loader2 } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock_count: "",
    price: "",
    description: "" // Vera Notu
  })

  // --- VERİ ÇEKME ---
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

  // --- ÜRÜN EKLEME ---
  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.stock_count && newProduct.price) {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          stock_count: parseInt(newProduct.stock_count),
          price: parseFloat(newProduct.price),
          description: newProduct.description || "Standart satis proseduru uygula"
        }])
        .select()

      if (!error) {
        setProducts([data[0], ...products])
        setNewProduct({ name: "", stock_count: "", price: "", description: "" })
        setIsModalOpen(false)
      }
    }
  }

  // --- ÜRÜN SİLME ---
  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Kritik", color: "text-red-600 bg-red-50 border-red-200" }
    if (stock <= 15) return { label: "Dusuk", color: "text-amber-600 bg-amber-50 border-amber-200" }
    return { label: "Normal", color: "text-[#6b8e6b] bg-[#f0f4f0] border-[#d4ddd4]" }
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-[#8faa8f]" />
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Urun Yonetimi</h1>
          <p className="text-muted-foreground text-base md:text-lg mt-1">
            Vera'nın hafızasındaki güncel stok ve ürün bilgileri
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="h-14 px-6 text-base font-semibold rounded-xl bg-[#8faa8f] hover:bg-[#7a9a7a] text-white">
              <Plus className="h-5 w-5 mr-2" /> Yeni Urun Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-white">
            <DialogHeader><DialogTitle>Yeni Urun Ekle</DialogTitle></DialogHeader>
            <div className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label>Urun Adi</Label>
                <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Stok</Label>
                  <Input type="number" value={newProduct.stock_count} onChange={(e) => setNewProduct({ ...newProduct, stock_count: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Fiyat</Label>
                  <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Vera Notu (AI Talimati)</Label>
                <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="rounded-xl" />
              </div>
              <Button onClick={handleAddProduct} className="w-full h-14 bg-[#8faa8f] hover:bg-[#7a9a7a] text-white rounded-xl">Kaydet</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & List */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Urun ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 h-12 rounded-xl" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#e2e8e2] bg-white shadow-sm hidden md:block">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <Package className="h-5 w-5 text-[#8faa8f]" /> Urun Listesi ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e2e8e2] text-left">
                <th className="p-4">Urun Adi</th>
                <th className="p-4 text-center">Stok</th>
                <th className="p-4 text-center">Fiyat</th>
                <th className="p-4">Vera Notu</th>
                <th className="p-4 text-center">Islemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock_count)
                return (
                  <tr key={product.id} className="border-b hover:bg-[#fafbfa]">
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                        {product.stock_count} - {stockStatus.label}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold">{product.price} TL</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#b87333]/10 text-[#8a5a28] text-sm">
                        {product.description}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}