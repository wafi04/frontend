import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetAllSearchProduct } from "@/features/product/hooks/api";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Search, Plus, Package, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";

interface Product {
  hargaModal: number;
  id: number;
  isActive: boolean;
  productCode: string;
  product_name: string;
}

interface ProductFlashSaleProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  flashSaleId?: number;
}

export function ProductFlashSale({ isOpen, onClose, onSelectProduct, flashSaleId }: ProductFlashSaleProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  /* ── Reset state saat modal dibuka / ditutup ── */
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedProducts([]);
      setIsSaving(false);
    }
  }, [isOpen]);

  /* ── Debounced search ── */
  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    []
  );

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  /* ── API call ── */
  const { data, isLoading, error } = useGetAllSearchProduct(search || undefined);

  /* ── Handlers ── */
  const handleAddProduct = useCallback(
    (product: Product) => {
      setSelectedProducts((prev) => {
        if (prev.find((p) => p.id === product.id)) return prev;
        const updated = [...prev, product];
        onSelectProduct?.(product);
        return updated;
      });
    },
    [onSelectProduct]
  );

  const handleRemoveProduct = useCallback((productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const handleSave = useCallback(async () => {
    if (selectedProducts.length === 0) return;
    setIsSaving(true);
    try {
      console.log("Saving products to flash sale:", flashSaleId, selectedProducts);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }, [flashSaleId, selectedProducts, onClose]);

  /* ── Render ── */
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Pilih Produk untuk Flash Sale
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <Input
            placeholder="Cari produk..."
            defaultValue={search}
            onChange={handleSearchChange}
            className="pl-10"
            aria-label="Cari produk"
          />
        </div>

        {/* Selected products */}
        {selectedProducts.length > 0 && (
          <section aria-label="Produk terpilih" className="rounded-lg p-3 border">
            <p className="text-sm font-medium mb-2">
              Produk Terpilih: {selectedProducts.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center bg-secondary border border-primary gap-2 px-3 py-1 rounded-md text-sm"
                >
                  <span className="truncate max-w-32" title={product.productCode}>
                    {product.productCode}
                  </span>
                  <button
                    type="button"
                    aria-label={`Hapus ${product.productCode}`}
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Product list */}
        <section
          aria-label="Daftar produk"
          className="border rounded-lg flex-1 overflow-hidden flex flex-col"
        >
          <header className="bg-card px-4 py-2 border-b">
            <h3 className="font-medium text-sm">Daftar Produk</h3>
          </header>

          <div className="flex-1 overflow-y-auto max-h-80">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />
                <span className="ml-3 text-sm">Memuat produk...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-sm text-red-600">Gagal memuat produk</span>
              </div>
            ) : data?.data?.length ? (
              data.data.map((product: Product) => {
                const isSelected = selectedProducts.some((p) => p.id === product.id);
                return (
                  <article
                    key={product.productCode}
                    className="flex items-center justify-between p-4 hover:bg-primary/20 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-card rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium truncate max-w-60" title={product.product_name}>
                          {product.product_name}
                        </h4>
                        <p className="text-sm text-gray-600">{FormatCurrency(product.hargaModal)}</p>
                        <p className="text-xs text-gray-500">Kode: {product.productCode}</p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAddProduct(product)}
                      disabled={isSelected}
                      aria-label={isSelected ? "Sudah dipilih" : `Pilih ${product.product_name}`}
                    >
                      {isSelected ? (
                        "✓ Dipilih"
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-1" />
                          Pilih
                        </>
                      )}
                    </Button>
                  </article>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="w-12 h-12 mb-3 text-gray-300" />
                <span className="text-sm text-gray-500">
                  {search ? `Tidak ada produk dengan kata kunci "${search}"` : "Tidak ada produk"}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Action buttons */}
        <footer className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600">{selectedProducts.length} produk dipilih</p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} disabled={isSaving}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={selectedProducts.length === 0 || isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}