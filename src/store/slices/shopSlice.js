import axiosInstance from "@/utils/axios-instance";
import { toast } from "sonner";

export const createShopSlice = (set, get) => ({
  loading: false,
  composedShop: null,
  products: null,
  categories: null,
  currentProduct: null,
  currentCategory: null,

  fetchProducts: async () => {
    const { products, composedShop } = get();
    if (products && composedShop) return;
    await get().refreshProducts();
  },

  refreshProducts: async () => {
    set({ loading: true });
    try {
      const token = get().token;

      const [productsRes, shopRes] = await Promise.all([
        axiosInstance.get("/products"),
        axiosInstance.get("/shop", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
      ]);

      set({
        products: productsRes.data.data,
        composedShop: shopRes.data.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    const { categories } = get();
    if (categories) return;
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/categories");
      set({ categories: response.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
      set({ loading: false });
    }
  },

  setCurrentProduct: (product) => set({ currentProduct: product }),
  setCurrentCategory: (category) => set({ currentCategory: category }),

  addToWishlist: async (productId) => {
    try {
      const response = await axiosInstance.post("/wish-list", {
        product_id: productId,
      });
      const updatedProduct = response.data.data;

      const updatedProducts = get().products?.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      set({ products: updatedProducts });

      if (get().currentProduct?.id === updatedProduct.id) {
        set({ currentProduct: updatedProduct });
      }
    } catch (error) {
      console.error("Add to wishlist failed:", error);
      toast.error("Failed to add to wishlist");
    }
  },

  removeFromWishList: async (productId) => {
    try {
      await axiosInstance.delete(`/wish-list/${productId}`);

      const updatedProducts = get().products?.map((p) =>
        p.id === productId ? { ...p, is_in_wishlist: false } : p
      );
      set({ products: updatedProducts });

      if (get().currentProduct?.id === productId) {
        set({
          currentProduct: {
            ...get().currentProduct,
            is_in_wishlist: false,
          },
        });
      }
    } catch (error) {
      console.error("Remove from wishlist failed:", error);
      toast.error("Failed to remove from wishlist");
    }
  },
});
