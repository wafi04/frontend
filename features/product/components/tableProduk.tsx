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
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TableProduct({ data }: { data: ProductWithProvider[] }) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const getProviderName = (
    providerId: number,
    providers: ProductWithProvider["providers"]
  ) => {
    const provider = providers.find((p) => p.providerId === providerId);
    return provider ? provider.providerName : `Provider ${providerId}`;
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
              Providers & Role Pricing
            </TableHead>
            <TableHead className="border border-gray-600 text-center">
              Terakhir Update
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-gray-600">
          {data.length > 0 ? (
            data.map((product) => {
              const roleNames = getAllRoleNames(product.providers);

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
                      {product.productName}
                    </TableCell>
                    <TableCell className="border border-gray-600">
                      {product.productCode}
                    </TableCell>
                    <TableCell className="font-mono border border-gray-600 text-center">
                      {product.productHargaModal}
                    </TableCell>
                    <TableCell className="border border-gray-600">
                      <div className="flex justify-center">
                        <Switch checked={product.productIsActive} disabled />
                      </div>
                    </TableCell>
                    <TableCell className="border border-gray-600 text-center">
                      {getProviderName(
                        product.productMainProvider,
                        product.providers
                      )}
                    </TableCell>
                    <TableCell className="border border-gray-600 text-center">
                      <div className="flex flex-col items-center space-y-1">
                        <span className="font-medium">
                          {product.providers.length} providers
                        </span>
                        <span className="text-xs text-muted-foreground"></span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground border border-gray-600">
                      {formatDate(product.updatedAt)}
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
