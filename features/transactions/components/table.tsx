import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Transactions } from "@/shared/types/transaction";
import { FormatCurrency, formatDate } from "@/utils/format";
import { cn } from "@/lib/utils";

export function TableTransactions({ data }: { data?: Transactions[] }) {
  if (!data || data.length === 0) {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold border border-gray-600">
                ID Transaksi
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Produk
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Tujuan
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Jumlah
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Fee
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Total
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Keuntungan
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Status
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Tipe
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Metode
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Waktu
              </TableHead>
              <TableHead className="font-semibold border border-gray-600">
                Update Terakhir
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={12} className="text-center py-16">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Tidak ada data transaksi
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Transaksi akan muncul di sini setelah ada aktivitas
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("success") ||
      statusLower.includes("berhasil") ||
      statusLower.includes("completed")
    ) {
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-ggray-600 hover:bg-green-100"
        >
          {status}
        </Badge>
      );
    }
    if (statusLower.includes("pending") || statusLower.includes("process")) {
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-gray-600 hover:bg-yellow-100"
        >
          {status}
        </Badge>
      );
    }
    if (
      statusLower.includes("failed") ||
      statusLower.includes("gagal") ||
      statusLower.includes("error")
    ) {
      return <Badge variant="destructive">{status}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  return (

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-600">
                ID Transaksi
              </TableHead>
              <TableHead className="border border-gray-600">
                Produk
              </TableHead>
              <TableHead className="border border-gray-600 min-w-[130px]">
                Tujuan
              </TableHead>
              <TableHead className="border border-gray-600">
                Jumlah
              </TableHead>
              <TableHead className="border border-gray-600 ">
                Fee
              </TableHead>
              <TableHead className="border border-gray-600">
                Total
              </TableHead>
              <TableHead className="border border-gray-600">
                Keuntungan
              </TableHead>
              <TableHead className="border border-gray-600">
                Status
              </TableHead>
              <TableHead className="border border-gray-600 ">
                Tipe
              </TableHead>
              <TableHead className="border border-gray-600">
                Metode
              </TableHead>
              <TableHead className="border border-gray-600">
                Waktu
              </TableHead>
              <TableHead className="border border-gray-600">
                Update Terakhir
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction, idx) => (
              <TableRow key={idx} className="hover:bg-muted/50">
                                <TableCell className="font-semibold border border-gray-600">
                   
                    {transaction.referenceId}
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
                  {transaction.productName}
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
                    {transaction.noTujuan}
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
                  {FormatCurrency(transaction.amount)}
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
                    {FormatCurrency(transaction.fee)}
                </TableCell>
                <TableCell className="font-semibold border border-gray-600">
                  {FormatCurrency(transaction.totalAmount)}
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
{FormatCurrency(transaction.profit)}</TableCell>
                                <TableCell className="font-semibold border border-gray-600">
{getStatusBadge(transaction.status)}</TableCell>
                                <TableCell className="font-semibold border border-gray-600">

                  <Badge className="text-black">{transaction.transactionType}</Badge>
                </TableCell>
                                <TableCell className="font-semibold border border-gray-600">
{transaction.paymentMethod}</TableCell>
                                <TableCell className="font-semibold border border-gray-600">
{formatDate(transaction.createdAt)}</TableCell>
                                <TableCell className="font-semibold border border-gray-600">
{formatDate(transaction.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
  );
}
