import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/shared/hooks/authStore";
import CardProfile from "../../components/profileCard";
import { FormatCurrency } from "@/utils/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormDepositContent } from "../../components/formDeposit";

export function UserPage() {
  const { user } = useAuthStore();
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 auto-rows-min">
        {user && <CardProfile user={user} />}

        <Card className="md:col-span-3 p-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold tracking-tight">
                  {FormatCurrency(user?.balance ?? 0)}
                </p>
                <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-5">
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            {/* Deposit Tab */}
            <TabsContent value="deposit">
              <FormDepositContent />
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership">
              <div className="flex flex-col w-full  md:flex-row  gap-6">
                <Card className="w-full md:max-w-[50%]  custom-scrollbar">
                  <CardHeader>
                    <CardTitle>Pilih Membership</CardTitle>
                  </CardHeader>
                  <CardContent>{/* <MembershipContent /> */}</CardContent>
                </Card>
                <Card className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                  <CardHeader>
                    <CardTitle>Riwayat Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* <TableProfileTopup
                      purchases={user.pembelian as Transaksi[]}
                    /> */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Transaction History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <TableProfileTopup
                    purchases={user.pembelian as Transaksi[]}
                  /> */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
