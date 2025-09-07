"use client";

import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateFlashSale, useUpdateflashsale } from "../api/api";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  UpsertFlashSale,
  UpsertFlashSaleProducts,
} from "@/shared/types/flash-sales";
import { Product, useGetAllSearchProduct } from "@/features/product/hooks/api";

export function FormFlashSale({ id }: { id?: number }) {
  const { mutate, isPending } = useCreateFlashSale();
  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateflashsale();

  const [step, setStep] = useState<1 | 2>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<
    UpsertFlashSaleProducts[]
  >([]);

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
  const { data, isLoading, error } = useGetAllSearchProduct(
    search || undefined
  );

  const handleAddProduct = useCallback((product: Product) => {
    const newProduct: UpsertFlashSaleProducts = {
      productId: product.id,
      originalPrice: product.hargaModal,
      flashSalePrice: product.hargaModal * 0.8,
      stockReserved: 100,
      stockSold: 0,
      thumbnail: "",
      usagePerUser: 1,
    };

    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.productId === product.id);
      if (!exists) {
        return [...prev, newProduct];
      }
      return prev;
    });
  }, []);

  const handleRemoveProduct = useCallback((productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  }, []);

  const handleUpdateProduct = useCallback(
    (productId: number, field: keyof UpsertFlashSaleProducts, value: any) => {
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, [field]: value } : p
        )
      );
    },
    []
  );

  const form = useForm<UpsertFlashSale>({
    defaultValues: {
      title: "",
      description: "",
      end_at: new Date().toISOString().slice(0, 16),
      start_at: new Date().toISOString().slice(0, 16),
      is_active: true,
      products: [],
    },
  });

  const toRFC3339 = (val: string): string => {
    if (!val) return val;
    return `${val}:00Z`;
  };

  const onSubmit = (data: UpsertFlashSale) => {
    const payload = {
      ...data,
      start_at: toRFC3339(data.start_at),
      end_at: toRFC3339(data.end_at),
      products: selectedProducts,
    };

    if (id) {
      updateMutate({ ...payload, id });
    } else {
      mutate(payload);
    }
  };

  console.log(selectedProducts);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Flash Sale Information</h2>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Judul flash sale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Deskripsi flash sale"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start & End At */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start At *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End At *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Active switch */}
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <div className="text-sm text-gray-500">
                      Enable or disable this flash sale
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Next button */}
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>
                Next: Select Products →
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Select Products</h2>
              <span className="text-sm text-gray-500">
                {selectedProducts.length} products selected
              </span>
            </div>

            {/* Search product */}
            <div className="space-y-4">
              <Input
                placeholder="Search products by name..."
                onChange={handleSearchChange}
                className="w-full"
              />

              {/* Available products */}
              {search && (
                <div className="border rounded-lg max-h-60 overflow-y-auto">
                  {isLoading && (
                    <div className="p-4 text-center text-gray-500">
                      Loading products...
                    </div>
                  )}

                  {data && data?.data.length ? (
                    <div className="divide-y">
                      {data.data.map((product: any) => {
                        const isSelected = selectedProducts.some(
                          (p) => p.productId === product.id
                        );
                        return (
                          <div key={product.id} className="p-3 ">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {product.thumbnail && (
                                  <img
                                    src={product.thumbnail}
                                    alt={product.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Rp {product.price?.toLocaleString("id-ID")}
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => handleAddProduct(product)}
                                disabled={isSelected}
                                variant={isSelected ? "secondary" : "default"}
                              >
                                {isSelected ? "Added" : "Add"}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : search && !isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      No products found
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Ketik nama produk untuk mulai mencari
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected products */}
            <div className="border rounded-lg">
              <div className="p-4 border-b ">
                <h3 className="font-medium">Selected Products</h3>
              </div>

              <div className="p-4">
                {selectedProducts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No products selected yet. Search and add products above.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.productId}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {product.thumbnail && (
                              <img
                                src={product.thumbnail}
                                alt={`Product ${product.productId}`}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-medium">
                                Product #{product.productId}
                              </p>
                              <p className="text-sm text-gray-500">
                                Original: Rp {product.originalPrice}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleRemoveProduct(product.productId)
                            }
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700">
                              Flash Sale Price *
                            </label>
                            <Input
                              type="number"
                              value={product.flashSalePrice}
                              onChange={(e) =>
                                handleUpdateProduct(
                                  product.productId,
                                  "flashSalePrice",
                                  Number(e.target.value)
                                )
                              }
                              placeholder="Flash sale price"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-700">
                              Stock Reserved
                            </label>
                            <Input
                              type="number"
                              value={product.stockReserved}
                              onChange={(e) =>
                                handleUpdateProduct(
                                  product.productId,
                                  "stockReserved",
                                  Number(e.target.value)
                                )
                              }
                              placeholder="Stock reserved"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-700">
                              Usage Per User
                            </label>
                            <Input
                              type="number"
                              value={product.usagePerUser}
                              onChange={(e) =>
                                handleUpdateProduct(
                                  product.productId,
                                  "usagePerUser",
                                  Number(e.target.value)
                                )
                              }
                              placeholder="Usage per user"
                              min="1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-700">
                              Discount
                            </label>
                            <div className="text-sm text-green-600 font-medium pt-2">
                              {Math.round(
                                ((product.originalPrice -
                                  product.flashSalePrice) /
                                  product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
              <Button
                type="submit"
                disabled={
                  isPending || updatePending || selectedProducts.length === 0
                }
              >
                {isPending || updatePending ? "Saving..." : "Save Flash Sale"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
