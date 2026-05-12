"use client"

import { useState } from "react"
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
import { Plus, Search, Package, Edit2, Trash2 } from "lucide-react"

interface Product {
  id: number
  name: string
  stock: number
  price: number
  veraNote: string
}

const initialProducts: Product[] = [
  { id: 1, name: "Organik Zeytinyagi (5L)", stock: 2, price: 450, veraNote: "Stok azaldiginda musteriye alternatif oner" },
  { id: 2, name: "Dogal Bal (1kg)", stock: 3, price: 280, veraNote: "Premium urun - fiyat indirimi yapma" },
  { id: 3, name: "Ev Yapimi Recel", stock: 5, price: 85, veraNote: "Coklu alimlarda %10 indirim uygula" },
  { id: 4, name: "Koy Yumurtasi (30lu)", stock: 45, price: 120, veraNote: "Gunluk taze - sabah siparislerinde oncelikli sun" },
  { id: 5, name: "Taze Peynir (500g)", stock: 12, price: 95, veraNote: "Soguk zincir uyarisi yap" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    veraNote: ""
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.stock && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        stock: parseInt(newProduct.stock),
        price: parseFloat(newProduct.price),
        veraNote: newProduct.veraNote || "Standart satis proseduru uygula"
      }
      setProducts([...products, product])
      setNewProduct({ name: "", stock: "", price: "", veraNote: "" })
      setIsModalOpen(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Kritik", color: "text-red-600 bg-red-50 border-red-200" }
    if (stock <= 15) return { label: "Dusuk", color: "text-amber-600 bg-amber-50 border-amber-200" }
    return { label: "Normal", color: "text-[#6b8e6b] bg-[#f0f4f0] border-[#d4ddd4]" }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Urun Yonetimi</h1>
          <p className="text-muted-foreground text-base md:text-lg mt-1">
            Tum urunlerinizi buradan yonetin
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="h-14 px-6 text-base md:text-lg font-semibold rounded-xl bg-[#8faa8f] hover:bg-[#7a9a7a] text-white"
            >
              <Plus className="h-5 w-5 md:h-6 md:w-6 mr-2" />
              Yeni Urun Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold text-foreground">
                Yeni Urun Ekle
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium text-foreground">
                  Urun Adi
                </Label>
                <Input
                  id="name"
                  placeholder="Urun adini girin"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="h-12 md:h-14 text-base rounded-xl border-[#e2e8e2] focus:border-[#8faa8f]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-base font-medium text-foreground">
                    Stok Adedi
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="h-12 md:h-14 text-base rounded-xl border-[#e2e8e2] focus:border-[#8faa8f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-medium text-foreground">
                    Fiyat (TL)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="h-12 md:h-14 text-base rounded-xl border-[#e2e8e2] focus:border-[#8faa8f]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="veraNote" className="text-base font-medium text-foreground">
                  Vera Notu (AI Talimati)
                </Label>
                <Input
                  id="veraNote"
                  placeholder="Vera bu urunu nasil tanitmali?"
                  value={newProduct.veraNote}
                  onChange={(e) => setNewProduct({ ...newProduct, veraNote: e.target.value })}
                  className="h-12 md:h-14 text-base rounded-xl border-[#e2e8e2] focus:border-[#8faa8f]"
                />
              </div>
              
              <Button 
                onClick={handleAddProduct}
                className="w-full h-14 text-lg font-semibold rounded-xl mt-4 bg-[#8faa8f] hover:bg-[#7a9a7a] text-white"
              >
                Urunu Kaydet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
            <Input
              placeholder="Urun ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 md:pl-14 h-12 md:h-14 text-base md:text-lg rounded-xl border-[#e2e8e2] focus:border-[#8faa8f]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table - Desktop */}
      <Card className="border border-[#e2e8e2] bg-white shadow-sm hidden md:block">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-foreground">
            <Package className="h-5 w-5 md:h-6 md:w-6 text-[#8faa8f]" />
            Urun Listesi ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e8e2]">
                  <th className="text-left p-4 font-semibold text-base text-foreground">Urun Adi</th>
                  <th className="text-center p-4 font-semibold text-base text-foreground">Stok</th>
                  <th className="text-center p-4 font-semibold text-base text-foreground">Fiyat</th>
                  <th className="text-left p-4 font-semibold text-base text-foreground">Vera Notu</th>
                  <th className="text-center p-4 font-semibold text-base text-foreground">Islemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <tr key={product.id} className="border-b border-[#e8ede8] hover:bg-[#fafbfa] transition-colors">
                      <td className="p-4">
                        <span className="font-medium text-base text-foreground">{product.name}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${stockStatus.color}`}>
                          {product.stock} - {stockStatus.label}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-bold text-lg text-foreground">{product.price} TL</span>
                      </td>
                      <td className="p-4">
                        {/* Vera Note with Bronze Badge */}
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#b87333]/10 border border-[#b87333]/20">
                          <span className="w-2 h-2 rounded-full bg-[#b87333]"></span>
                          <span className="text-sm text-[#8a5a28] font-medium">{product.veraNote}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-[#f0f4f0]">
                            <Edit2 className="h-5 w-5 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-lg hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Products Cards - Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock)
          return (
            <Card key={product.id} className="border border-[#e2e8e2] bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                    {product.stock} adet
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-[#8faa8f]">{product.price} TL</span>
                </div>
                
                {/* Vera Note with Bronze Badge */}
                <div className="p-3 bg-[#b87333]/10 border border-[#b87333]/20 rounded-xl mb-4">
                  <p className="text-sm text-[#8a5a28]">
                    <span className="font-semibold text-[#b87333]">Vera Notu: </span>
                    {product.veraNote}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-11 rounded-xl border-[#e2e8e2]">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Duzenle
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-11 px-4 rounded-xl text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
