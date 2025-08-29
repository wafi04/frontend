"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProductWithProvider } from "@/shared/types/productWithProvider"
import {formatDate } from "@/utils/format"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TableProduct({ data }: { data: ProductWithProvider[] }) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const getProviderName = (providerId: number, providers: ProductWithProvider["providers"]) => {
    const provider = providers.find((p) => p.providerId === providerId)
    return provider ? provider.providerName : `Provider ${providerId}`
  }

  const toggleExpanded = (productId: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId)
    } else {
      newExpanded.add(productId)
    }
    setExpandedRows(newExpanded)
  }

  const getAllRoleNames = (providers: ProductWithProvider["providers"]) => {
    const roleNames = new Set<string>()
    providers.forEach((provider) => {
      provider.rolePrices.forEach((rolePrice) => {
        roleNames.add(rolePrice.roleName)
      })
    })
    return Array.from(roleNames).sort()
  }

  return (
    <section className="px-4">
      <Table className="border">
        <TableHeader className="border">
          <TableRow className="border">
            <TableHead className="border text-center w-12"></TableHead>
            <TableHead className="border text-center">ID</TableHead>
            <TableHead className="border text-center">Name</TableHead>
            <TableHead className="border text-center">Code</TableHead>
            <TableHead className="border text-center">Harga Modal</TableHead>
            <TableHead className="border text-center">Status</TableHead>
            <TableHead className="border text-center">Provider Utama</TableHead>
            <TableHead className="border text-center">Providers & Role Pricing</TableHead>
            <TableHead className="border text-center">Terakhir Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {data.length > 0 ? (
            data.map((product) => {
              const roleNames = getAllRoleNames(product.providers)

              return (
                <>
                  <TableRow key={product.productId} className="border text-center">
                    <TableCell className="border-r text-center">
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
                    <TableCell className="font-medium border-r text-center">{product.productId}</TableCell>
                    <TableCell className="font-medium border-r text-center">{product.productName}</TableCell>
                    <TableCell className="border-r">
                      <Badge variant="outline">{product.productCode}</Badge>
                    </TableCell>
                    <TableCell className="font-mono border-r text-center">
                      {(product.productHargaModal)}
                    </TableCell>
                    <TableCell className="flex items-center text-center border-r space-x-2">
                      <Switch checked={product.productIsActive} disabled />
                      <span className={`text-xs ${product.productIsActive ? "text-green-600" : "text-red-600"}`}>
                        {product.productIsActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    <TableCell className="border-r text-center">
                      {getProviderName(product.productMainProvider, product.providers)}
                    </TableCell>
                    <TableCell className="border-r text-center">
                      <div className="flex flex-col items-center space-y-1">
                        <span className="font-medium">{product.providers.length} providers</span>
                        <span className="text-xs text-muted-foreground">
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground border-r">{formatDate(product.updatedAt)}</TableCell>
                  </TableRow>
                  {expandedRows.has(product.productId) && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-0">
                        <div className="border-t">
                          <Table>
                            <TableHeader className="border">
                              <TableRow className="border">
                                <TableHead className="font-medium border-r text-center">Provider Name</TableHead>
                                <TableHead className="font-medium border-r text-center">Status</TableHead>
                                {roleNames.map((roleName) => (
                                  <TableHead key={roleName} className="font-medium border-r text-center">
                                    {roleName.toUpperCase()}
                                  </TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {product.providers.map((provider) => (
                                <TableRow key={provider.providerId} className="font-medium border-r text-center">
                                  <TableCell className="font-medium border-r">{provider.providerName}</TableCell>
                                    <TableCell className="flex items-center text-center border-r space-x-2">
                                    <Switch checked={provider.isActive} disabled />
                                    <span className={`text-xs ${provider.isActive ? "text-green-600" : "text-red-600"}`}>
                                        {provider.isActive ? "Aktif" : "Nonaktif"}
                                    </span>
                                    </TableCell>
                                  {roleNames.map((roleName) => (
                                    <TableCell key={roleName} className="font-mono border-r">
                                      {
                                        provider.rolePrices.find((rp) => rp.roleName === roleName)?.price}
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
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                Tidak ada data produk
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
