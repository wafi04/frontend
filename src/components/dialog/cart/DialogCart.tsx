import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { useAddToCart } from "@/lib/api/cart/cart";
import { ProductDetails } from "@/types/product";
import { VariantsData } from "@/types/variants";
import { FormatPrice } from "@/utils/Format";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface ModalAddToCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: ProductDetails;
  selectedVariant: VariantsData | undefined;
}
export function ModalAddToCart({
  isOpen,
  setIsOpen,
  product,
  selectedVariant,
}: ModalAddToCartProps) {
  const { count, increase, decrease, total, size, price } = useCart();

  const addToCart = useAddToCart();

  const onSubmit = () => {
    addToCart.mutate({
      quantity: count,
      size,
      total,
      price,
      variant_id: selectedVariant?.id as string,
    });
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Product Summary */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 relative">
              <Image
                src={selectedVariant?.images[0].url as string}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">Size : {size}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decrease}
                disabled={count === 0}>
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center">{count}</span>
              <Button variant="outline" size="icon" onClick={increase}>
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="font-medium">Total:</span>
            <span className="">{FormatPrice(total)}</span>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
            <Button
              className="flex-1"
              onClick={onSubmit}
              disabled={addToCart.isPending}>
              {addToCart.isPending ? "Processing" : "Add To Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
