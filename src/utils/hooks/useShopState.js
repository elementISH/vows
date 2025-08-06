"use client";

import { useEffect } from "react";
import { useStore } from "@/store";

export default function useShopState() {
  const loading = useStore((state) => state.loading);
  const products = useStore((state) => state.products);
  const composedShop = useStore((state) => state.composedShop);
  const categories = useStore((state) => state.categories);
  const currentProduct = useStore((state) => state.currentProduct);
  const currentCategory = useStore((state) => state.currentCategory);
  const refreshProducts = useStore((state) => state.refreshProducts);
  const setCurrentProduct = useStore((state) => state.setCurrentProduct);
  const setCurrentCategory = useStore((state) => state.setCurrentCategory);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const fetchCategories = useStore((state) => state.fetchCategories);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishList = useStore((state) => state.removeFromWishList);

  useEffect(() => {
    if (!products || !composedShop) fetchProducts();
    // if (!categories) fetchCategories();
  }, [products, categories, composedShop, fetchProducts, fetchCategories]);

  return {
    loading,
    composedShop,
    products,
    categories,
    currentProduct,
    currentCategory,
    refreshProducts,
    setCurrentProduct,
    setCurrentCategory,
    addToWishlist,
    removeFromWishList,
  };
}
