import type { Product } from "../types/index";

  export const products: Product[] = [
    {
      product: "T-shirt",
      description: "A cool and comfortable T-shirt available in multiple colors and sizes.",
      price: 19.99,
      options: [
        { name: "Color", values: ["Red", "Green", "Blue"] },
        { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
        { name: "Text", values: null }
      ],
      image: "/images/tshirt.png"
    },
    {
      product: "Mug",
      description: "A stylish mug perfect for coffee, tea, or any beverage.",
      price: 9.99,
      options: [
        { name: "Color", values: ["White", "Black"] },
        { name: "Text", values: null }
      ],
      image: "/images/mug.png"
    },
    {
      product: "Sticker",
      description: "A fun sticker with various size options.",
      price: [2.99, 3.99, 4.99], 
      options: [
        { name: "Size", values: ["Small", "Medium", "Large"] }
      ],
      image: "/images/sticker.png"
    },
    {
      product: "Poster",
      description: "A high-quality printed poster in various sizes.",
      price: [15.99, 18.99, 21.99],
      options: [
        { name: "Size", values: ["Small", "Medium", "Large"] }
      ],
      image: "/images/poster.png"
    },
    {
      product: "Gift Card",
      description: "A digital gift card for our store.",
      price: [10.00, 20.00, 50.00, 100.00],
      options: [], 
      image: "/images/giftcard.png"
    },
    {
      product: "Digital Download",
      description: "Downloadable product, e.g., a wallpaper or ebook.",
      price: 4.99,
      options: [
        { name: "Format", values: ["PDF", "JPG", "PNG"] }
      ],
      image: "/images/digital.png"
    }
  ];
  