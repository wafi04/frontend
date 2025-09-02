"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { FlashSale } from "@/shared/types/flash-sales";
import { formatDate } from "@/utils/format";

export function TableFlashSales({ data }: { data: FlashSale[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Status</TableHead>
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
                    (max Rp {sale.MaxDiscount.toLocaleString()})
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
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
