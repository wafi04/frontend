import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useClearCart } from "@/lib/api/cart/cart";
import { FormatPrice } from "@/utils/Format";

export function CartProcessed({ total }: { total: number }) {
  const clear = useClearCart();
  return (
    <Card className="shadow-md">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{FormatPrice(total)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="text-gray-500">Calculated at checkout</span>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{FormatPrice(total)}</span>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Proceed to Checkout
        </button>
        <Button
          onClick={() => clear.mutate()}
          disabled={clear.isPending}
          className="w-full text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Clear Cart
        </Button>
      </CardContent>
    </Card>
  );
}
