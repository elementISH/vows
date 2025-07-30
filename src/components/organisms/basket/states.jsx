import { useState } from "react";

export const useCartState = () => {
  const [quantity, setQuantity] = useState(3);

  return { quantity, setQuantity };
};
