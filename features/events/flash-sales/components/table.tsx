"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DialogDelete, DialogForm } from "../dialog/dialog";

export function TableFlashSales({ data }: { data: FlashSale[] }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale | null>(
    null
  );

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
      <div className="rounded-xl mt-7  border border-border shadow-md overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-muted/50">
            <TableRow className="">
              <TableHead className="border-r border-b border-gray-800">
                Title
              </TableHead>
              <TableHead className="border-r border-b border-gray-800">
                Discount
              </TableHead>
              <TableHead className="border-r border-b border-gray-800">
                Period
              </TableHead>
              <TableHead className="border-r border-b border-gray-800">
                Usage
              </TableHead>
              <TableHead className="border-r border-b border-gray-800">
                Status
              </TableHead>
              <TableHead className="border-r border-b border-gray-800">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
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
                <TableRow key={sale.ID} className=" hover:bg-muted/30">
                  <TableCell className="font-medium border-r border-b border-gray-800">
                    {sale.Title}
                  </TableCell>
                  <TableCell className="border-r border-b border-gray-800">
                    {sale.DiscountType === "percentage"
                      ? `${sale.DiscountValue}%`
                      : `${sale.DiscountValue}`}
                    {sale.MaxDiscount && (
                      <span className="ml-1 text-xs text-muted-foreground border-r border-b border-gray-800">
                        (&nbsp;Max {FormatCurrency(sale.MaxDiscount)}&nbsp;)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="border-r border-b border-gray-800">
                    {formatDate(sale.StartAt)} – {formatDate(sale.EndAt)}
                  </TableCell>
                  <TableCell className="border-r border-b border-gray-800">
                    {sale.UsageLimit
                      ? `${sale.UsagePerUser}/${sale.UsageLimit}`
                      : `${sale.UsagePerUser}/∞`}
                  </TableCell>
                  <TableCell className="border-r border-b border-gray-800">
                    {sale.IsActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inactive</span>
                    )}
                  </TableCell>
                  <TableCell className="border-r border-b border-gray-800">
                    <DropdownMenu>
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

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFlashSale(sale);
                            setOpenEdit(true);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Flash Sale
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFlashSale(sale);
                            setOpenDelete(true);
                          }}
                          className="flex items-center gap-2 text-red-600 focus:text-red-600"
                        >
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
      </div>
      {open && (
        <ProductFlashSale
          isOpen={open}
          onClose={handleCloseDialog}
          flashSaleId={selectedFlashSale?.ID}
        />
      )}
      {openEdit && (
        <DialogForm
          open={openEdit}
          onOpen={() => setOpenEdit(false)}
          initialData={{
            title: selectedFlashSale?.Title as string,
            description: selectedFlashSale?.Description,
            start_at: selectedFlashSale?.StartAt as string,
            end_at: selectedFlashSale?.EndAt as string,
            discount_type: selectedFlashSale?.DiscountType ?? "percentage",
            discount_value: selectedFlashSale?.DiscountValue ?? 0,
            max_discount: selectedFlashSale?.MaxDiscount ?? null,
            min_purchase: selectedFlashSale?.MinPurchase ?? 0,
            usage_limit: selectedFlashSale?.UsageLimit ?? null,
            usage_per_user: selectedFlashSale?.UsagePerUser ?? 1,
            is_active: selectedFlashSale?.IsActive ?? true,
            banner_url: selectedFlashSale?.BannerUrl,
          }}
          Id={selectedFlashSale?.ID}
        />
      )}
      {/* Dialog untuk Delete */}
      {openDelete && (
        <DialogDelete
          open={openDelete}
          onOpen={() => setOpenDelete(false)}
          Id={selectedFlashSale?.ID}
        />
      )}
    </>
  );
}
