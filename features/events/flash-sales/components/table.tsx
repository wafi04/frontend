"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { FlashSale } from "@/shared/types/flash-sales";
import { FormatCurrency, formatDate } from "@/utils/format";
import { useState } from "react";
import { ProductFlashSale } from "../dialog/Addproduct";
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from "lucide-react";

export function TableFlashSales({ data }: { data: FlashSale[] }) {
  const [open, setOpen] = useState(false);
  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale | null>(null);

  const handleAddProduct = (flashSale: FlashSale) => {
    setSelectedFlashSale(flashSale);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedFlashSale(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No flash sales available
              </TableCell>
            </TableRow>
          ) : (
            data.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.Title}</TableCell>
                <TableCell>
                  {sale.DiscountType === "percentage"
                    ? `${sale.DiscountValue}%`
                    : `${sale.DiscountValue}`}
                  {sale.MaxDiscount && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      (&nbsp;Max {FormatCurrency(sale.MaxDiscount)}&nbsp;)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {formatDate(sale.StartAt)} – {formatDate(sale.EndAt)}
                </TableCell>
                <TableCell>
                  {sale.UsageLimit
                    ? `${sale.UsagePerUser}/${sale.UsageLimit}`
                    : `${sale.UsagePerUser}/∞`}
                </TableCell>
                <TableCell>
                  {sale.IsActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactive</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    {/* INI YANG KURANG - DROPDOWN TRIGGER! */}
                    <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        onClick={() => handleAddProduct(sale)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Tambahkan Product
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Flash Sale
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <ProductFlashSale 
        isOpen={open} 
        onClose={handleCloseDialog}
        flashSaleId={selectedFlashSale?.id}
      />
    </>
  );
}