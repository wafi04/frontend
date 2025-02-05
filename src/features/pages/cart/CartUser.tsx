"use client";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { FormatPrice } from "@/utils/Format";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import { CartProcessed } from "./CartProcessed";
import {
  useGetCart,
  useRemoveCartItems,
  useUpdateQuantity,
} from "@/lib/api/cart/cart";

export function CartUserPage() {
  const { data } = useGetCart();
  const removeCartItms = useRemoveCartItems();
  const updateItemQuantity = useUpdateQuantity();

  const handleCount = (
    type: "decrease" | "increase",
    itemId: string,
    currentQuantity: number,
    size: string
  ) => {
    const newQuantity: number =
      type === "increase"
        ? currentQuantity + 1
        : Math.max(currentQuantity - 1, 0);
    console.log(newQuantity);
    updateItemQuantity.mutate({
      cartItemId: itemId,
      quantity: newQuantity,
      size: size,
    });
  };

  console.log(data);

  if (!data || !data.cart_items || data.cart_items.length === 0) {
    return (
      <LayoutsWithHeaderAndFooter className="mt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]  text-center">
          <ShoppingCart size={48} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">Add some items to get started!</p>
        </div>
      </LayoutsWithHeaderAndFooter>
    );
  }

  return (
    <LayoutsWithHeaderAndFooter className="mt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Cart Items Section */}
          <div className="space-y-6">
            {data.cart_items.map((item: CartItem) => (
              <Card key={item.cart_item_id} className="shadow-md">
                <CardContent className="p-6 flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url as string}
                      alt={item.product_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        disabled={removeCartItms.isPending}
                        onClick={() => removeCartItms.mutate(item.cart_item_id)}
                        className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleCount(
                              "decrease",
                              item.cart_item_id,
                              item.quantity,
                              item.size
                            )
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors">
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleCount(
                              "increase",
                              item.cart_item_id,
                              item.quantity,
                              item.size
                            )
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors">
                          +
                        </button>
                      </div>
                      <p className="font-semibold">
                        {FormatPrice(item.sub_total)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <CartProcessed total={data.total} />
        </div>
      </div>
    </LayoutsWithHeaderAndFooter>
  );
}
