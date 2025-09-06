"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { VoucherData } from "@/shared/types/voucher";
import { formatDate } from "@/utils/format";
import { useState } from "react";
import { DialogDelete, DialogForm } from "./dialog";

export function TableVouchers({ data }: { data: VoucherData[] }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(
    null
  );

  return (
    <div className="rounded-xl mt-5 border border-gray-800 shadow-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="border-r border-b border-gray-800">
              ID
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Kode
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Tipe
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Nominal / Persen
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Diskon Maksimal
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Minimal Belanja
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Jumlah Diterbitkan
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Sudah Dipakai
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Batas Pemakaian
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Pemakaian / Pengguna
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Berlaku Dari
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Berlaku Sampai
            </TableHead>
            <TableHead className="border-r border-b border-gray-800">
              Aktif
            </TableHead>
            <TableHead className="border-b border-gray-800">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.id}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.code}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.type}
              </TableCell>

              <TableCell className="border-r border-b border-gray-800">
                {voucher.type === "PERCENTAGE" && (
                  <span>{voucher.percentage ?? "-"}%</span>
                )}
                {voucher.type === "FIXED" && (
                  <span>Rp {voucher.amount.toLocaleString("id-ID")}</span>
                )}
                {voucher.type === "HYBRID" && (
                  <>
                    <span>{voucher.percentage ?? "-"}%</span>
                    {" + "}
                    <span>Rp {voucher.amount.toLocaleString("id-ID")}</span>
                  </>
                )}
              </TableCell>

              <TableCell className="border-r border-b border-gray-800">
                Rp {voucher.maxDiscount.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                Rp {voucher.minCartValue.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.issuedQty}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.usedCount}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.usedLimit}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.usagePerUser}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {formatDate(voucher.validFrom)}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {formatDate(voucher.validUntil)}
              </TableCell>
              <TableCell className="border-r border-b border-gray-800">
                {voucher.isActive ? (
                  <span className="text-green-600 font-semibold">Ya</span>
                ) : (
                  <span className="text-red-600 font-semibold">Tidak</span>
                )}
              </TableCell>
              <TableCell className="border-b border-gray-800 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedVoucher(voucher);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedVoucher(voucher);
                    setOpenDelete(true);
                  }}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog untuk Edit */}
      {openEdit && (
        <DialogForm
          open={openEdit}
          onOpen={() => setOpenEdit(false)}
          initialData={{
            ...(selectedVoucher as VoucherData),
          }}
          Id={selectedVoucher?.id}
        />
      )}

      {/* Dialog untuk Delete */}
      {openDelete && (
        <DialogDelete
          open={openDelete}
          onOpen={() => setOpenDelete(false)}
          Id={selectedVoucher?.id}
        />
      )}
    </div>
  );
}
