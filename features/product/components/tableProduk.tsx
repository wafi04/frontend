"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductWithProvider } from "@/shared/types/productWithProvider";
import { formatDate } from "@/utils/format";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ChevronDown, ChevronRight, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteProducts, useUpdateProduct } from "../hooks/api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function TableProduct({ data }: { data: ProductWithProvider[] }) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [localProducts, setLocalProducts] =
    useState<ProductWithProvider[]>(data);
  const { mutate } = useUpdateProduct();

  const hasChanges = (product: ProductWithProvider) => {
    const original = data.find((p) => p.productId === product.productId);
    if (!original) return false;

    return (
      original.productName !== product.productName ||
      original.productCode !== product.productCode ||
      original.productIsActive !== product.productIsActive ||
      original.productMainProvider !== product.productMainProvider
    );
  };

  const toggleExpanded = (productId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedRows(newExpanded);
  };

  const getAllRoleNames = (providers: ProductWithProvider["providers"]) => {
    const roleNames = new Set<string>();
    providers.forEach((provider) => {
      provider.rolePrices.forEach((rolePrice) => {
        roleNames.add(rolePrice.roleName);
      });
    });
    return Array.from(roleNames).sort();
  };

  function handleSave(productId: number) {
    const product = localProducts.find((p) => p.productId === productId);
    if (!product) return;

    mutate(
      {
        productId,
        data: {
          isActive: product.productIsActive,
          mainProviderId: product.productMainProvider,
          product_name: product.productName,
          productCode: product.productCode,
        },
      },
      {
        onSuccess: () => {
          console.log("Update sukses");
        },
        onError: (err) => {
          console.error("Update gagal", err);
        },
      }
    );
  }

  return (
    <section className="px-4">
      <Table className="border border-gray-600">
        <TableHeader className="border border-gray-600">
          <TableRow className="border border-gray-600">
            <TableHead className="border border-gray-600  text-center w-12"></TableHead>
            <TableHead className="border border-gray-600 text-center">
              ID
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Name
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Code
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Harga Modal
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Status
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Provider Utama
            </TableHead>

            <TableHead className="border border-gray-600 text-center">
              Terakhir Update
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-gray-600">
          {data.length > 0 ? (
            localProducts.map((product) => {
              const roleNames = getAllRoleNames(product.providers);
              const changed = hasChanges(product);

              return (
                <>
                  <TableRow
                    key={product.productId}
                    className="font-medium border border-gray-600 text-center "
                  >
                    <TableCell className="border border-gray-600 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(product.productId)}
                        className="h-6 w-6 p-0"
                      >
                        {expandedRows.has(product.productId) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium border border-gray-600 text-center">
                      {product.productId}
                    </TableCell>
                    <TableCell className="font-medium border border-gray-600 text-center">
                      <input
                        value={product.productName}
                        onChange={(e) =>
                          setLocalProducts((prev) =>
                            prev.map((p) =>
                              p.productId === product.productId
                                ? { ...p, productName: e.target.value }
                                : p
                            )
                          )
                        }
                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-center w-full"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-600">
                      <input
                        value={product.productCode}
                        onChange={(e) =>
                          setLocalProducts((prev) =>
                            prev.map((p) =>
                              p.productId === product.productId
                                ? { ...p, productCode: e.target.value }
                                : p
                            )
                          )
                        }
                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-center w-fit"
                      />
                    </TableCell>
                    <TableCell className="font-mono border border-gray-600 text-center">
                      {product.productHargaModal}
                    </TableCell>
                    <TableCell className="border border-gray-600">
                      <div className="flex justify-center">
                        <Switch
                          checked={product.productIsActive}
                          onCheckedChange={(val) =>
                            setLocalProducts((prev) =>
                              prev.map((p) =>
                                p.productId === product.productId
                                  ? { ...p, productIsActive: val }
                                  : p
                              )
                            )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="border border-gray-600 text-center">
                      <Select
                        value={String(product.productMainProvider)}
                        onValueChange={(val) =>
                          setLocalProducts((prev) =>
                            prev.map((p) =>
                              p.productId === product.productId
                                ? { ...p, productMainProvider: Number(val) }
                                : p
                            )
                          )
                        }
                      >
                        <SelectTrigger className="w-full bg-transparent border-none focus:ring-0 text-center">
                          <SelectValue placeholder="Pilih provider utama" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.providers.map((provider) => (
                            <SelectItem
                              key={provider.providerId}
                              value={String(provider.providerId)}
                            >
                              {provider.providerName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="text-muted-foreground border border-gray-600">
                      {formatDate(product.updatedAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground border border-gray-600">
                      <Button
                        onClick={() => handleSave(product.productId)}
                        variant={changed ? "default" : "secondary"}
                        disabled={!changed}
                      >
                        {changed ? "Save Changes" : "Saved"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(product.productId) && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-0">
                        <div className="border border-gray-600-t">
                          <Table>
                            <TableHeader className="border border-gray-600">
                              <TableRow className="border border-gray-600">
                                <TableHead className="font-medium border border-gray-600 text-center">
                                  Provider Name
                                </TableHead>
                                <TableHead className="font-medium border border-gray-600 text-center">
                                  Status
                                </TableHead>
                                <TableHead className="font-medium border border-gray-600 text-center">
                                  Harga Modal
                                </TableHead>
                                {roleNames.map((roleName) => (
                                  <TableHead
                                    key={roleName}
                                    className="font-medium border border-gray-600 text-center"
                                  >
                                    {roleName.toUpperCase()}
                                  </TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {product.providers.map((provider) => (
                                <TableRow
                                  key={provider.providerId}
                                  className="font-medium border border-gray-600 text-center "
                                >
                                  <TableCell className="font-medium border border-gray-600">
                                    {provider.providerName}
                                  </TableCell>
                                  <TableCell className="border border-gray-600">
                                    <div className="flex justify-center">
                                      <Switch
                                        checked={provider.isActive}
                                        disabled
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-medium border border-gray-600">
                                    {provider.hargaModal}
                                  </TableCell>
                                  {roleNames.map((roleName) => (
                                    <TableCell
                                      key={roleName}
                                      className="font-mono border border-gray-600"
                                    >
                                      {
                                        provider.rolePrices.find(
                                          (rp) => rp.roleName === roleName
                                        )?.price
                                      }
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-8 text-muted-foreground"
              >
                Tidak ada data produk
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
