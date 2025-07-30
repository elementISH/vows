"use client";

import { Button } from "@/components/atoms";
import { useStore } from "@/store";
import { toast } from "sonner";

export default function AddToCart({
  product,
  selectedColor,
  selectedSize,
  hasCustomization,
}) {
  const addToCart = useStore((state) => state.addToCart);
  const loading = useStore((state) => state.loading);
  const cart = useStore((state) => state.cart);
  const isInCart = cart.some(
    (i) =>
      i.id === product.id &&
      i.color === selectedColor &&
      i.size === selectedSize
  );
  const handleAdd = () => {
    if (!hasCustomization && (!selectedColor || !selectedSize)) {
      toast.info("Please select color and size before adding to cart");
      return;
    }

    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      customization: hasCustomization ? "customizationData" : null,
    };

    addToCart(payload);
  };

  return (
    <Button
      size="sm"
      onClick={handleAdd}
      isLoading={loading}
      rounded="full"
      disabled={isInCart}
    >
      {isInCart
        ? "Added"
        : hasCustomization
        ? "Start customizing"
        : "Add to cart"}
    </Button>
  );
}
