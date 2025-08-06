const product = {
  id: 1001,
  name: "Men's Classic Hoodie",
  slug: "mens-classic-hoodie",
  category: "Men",
  description:
    "A premium quality hoodie perfect for everyday wear. Comfortable, stylish, and available in various colors.",
  price: 799.99, // base price before any discounts
  isActive: false,
  isFeatured: false,
  isInWishlist: true,
  hasAddons: true,
  rating: { rate: 5, amount: 4000 },
  similarProducts: [
    { categoryName: "hello world", products: [...similarProductsList] },
  ],
  addons: [
    // addons are always optional for the client to add
    {
      type: "text",
      fonts: ["Robot", "Open Sans", "Playfair Display"], // i will provide you with list for selection in the dashboard
      location: "Back", // input from admin
      allowLetterSpacingControl: true,
      price: 300,
    },
    {
      type: "pattern",
      patterns: ["image url 1", "image url 2", "image url 3"], // i will provide you with list for selection in the dashboard
      maxSelection: 2,
      allowLetterSpacingControl: true,
      price: 400,
    },
    {
      type: "images-upload",
      numberOfImages: 3, // maximum allowed 5
      price: 500,
    },
  ],
  discount: {
    type: "percentage", // "percentage" | "flat"
    value: 20, // 20% off
    expiresAt: "2025-12-31T23:59:59Z", // optional
  },
  coupon: {
    code: "WELCOME10",
    type: "flat", // or "percentage"
    value: 100.0, // 100 EGP
    isStackable: false, // whether this can be combined with discount
    validUntil: "2025-10-01T00:00:00Z", // required
  },
  sizeChart: [
    { size: "X-Small", length: 67, width: 61 },
    { size: "Small", length: 69, width: 63 },
    { size: "Medium", length: 71, width: 65 },
    { size: "Large", length: 73, width: 67 },
    { size: "XLarge", length: 75, width: 69 },
    { size: "2XLarge", length: 77, width: 71 },
  ],
  variants: [
    // each product variant will be treated as an individual product in the cart
    {
      variantId: 201,
      isActive: true,
      color: {
        id: 1,
        name: "Black",
        hex: "#000000",
      },
      images: [
        {
          id: 1,
          url: "https://example.com/images/hoodie-black-1.jpg",
          isPrimary: true,
          alt: "Black hoodie front view",
        },
        {
          id: 2,
          url: "https://example.com/images/hoodie-black-2.jpg",
          isPrimary: false,
          alt: "Black hoodie back view",
        },
      ],
      sizes: [
        // must be sorted in order e.g small, medium, large, x-large
        {
          id: 101,
          name: "Small",
          sizeCode: "S",
          stock: 25,
          sku: "HD-BLK-S",
        },
        {
          id: 102,
          name: "Medium",
          sizeCode: "M",
          stock: 10,
          sku: "HD-BLK-M",
        },
        {
          id: 103,
          name: "Large",
          sizeCode: "L",
          stock: 0,
          sku: "HD-BLK-L",
        },
      ],
    },
    {
      variantId: 202,
      isActive: true,
      color: {
        id: 2,
        name: "Navy Blue",
        hex: "#1E3A8A",
      },
      images: [
        {
          id: 3,
          url: "https://example.com/images/hoodie-blue-1.jpg",
          isPrimary: true,
          alt: "Navy hoodie front",
        },
        {
          id: 4,
          url: "https://example.com/images/hoodie-blue-2.jpg",
          isPrimary: false,
          alt: "Navy hoodie side",
        },
      ],
      sizes: [
        {
          id: 104,
          name: "Small",
          sizeCode: "S",
          stock: 5,
          sku: "HD-NVY-S",
        },
        {
          id: 105,
          name: "Medium",
          sizeCode: "M",
          stock: 99,
          sku: "HD-NVY-M",
        },
        {
          id: 106,
          name: "Large",
          sizeCode: "L",
          stock: 45,
          sku: "HD-NVY-L",
        },
      ],
    },
    {
      variantId: 203,
      isActive: true,
      color: {
        id: 3,
        name: "Olive Green",
        hex: "#556B2F",
      },
      images: [
        {
          id: 5,
          url: "https://example.com/images/hoodie-olive-1.jpg",
          isPrimary: true,
          alt: "Olive green hoodie front",
        },
        {
          id: 6,
          url: "https://example.com/images/hoodie-olive-2.jpg",
          isPrimary: false,
          alt: "Olive green hoodie detail",
        },
      ],
      sizes: [
        {
          id: 107,
          name: "Small",
          sizeCode: "S",
          stock: 0,
          sku: "HD-OLV-S",
        },
        {
          id: 108,
          name: "Medium",
          sizeCode: "M",
          stock: 30,
          sku: "HD-OLV-M",
        },
        {
          id: 109,
          name: "Large",
          sizeCode: "L",
          stock: 10,
          sku: "HD-OLV-L",
        },
      ],
    },
  ],
};
