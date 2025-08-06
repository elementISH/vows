import { toast } from "sonner";

export const createCartSlice = (set, get) => ({
  cart: [],
  loading: false,
  selected: {},

  selectOption: (productId, field, value) =>
    set((state) => ({
      selected: {
        ...state.selected,
        [productId]: {
          ...state.selected[productId],
          [field]: value,
        },
      },
    })),

  addToCart: (item) => {
    set({ loading: true });

    const exists = get().cart.some(
      (i) => i.id === item.id && i.color === item.color && i.size === item.size
    );

    if (!exists) {
      set((state) => ({
        cart: [...state.cart, item],
        loading: false,
      }));
      toast.success("Item added to cart");
    } else {
      toast.info("Item already in cart");
      set({ loading: false });
    }
  },
});
