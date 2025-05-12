import type { Product } from "../types/index";
import { tshirtBlack, tshirtWhite, tshirtGrey, bottleBlack, bottleBlue, bottleGreen, bottlePink, bottleWhite, sticker1, sticker2, sticker3, gymBag, giftCard  } from "../assets/images";
export const products: Product[] = [
  {
    product: "T-shirt",
    description: "A cool and comfortable T-shirt available in multiple colors and sizes.",
    price: 19.99,
    options: [
      { name: "Color", values: ["Black", "White", "Grey"] },
      { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { name: "Text", values: null }
    ],
    image: tshirtBlack,
    images: {
      Black: tshirtBlack,
      White: tshirtWhite,
      Grey: tshirtGrey
    }
  },
  {
    product: "Water Bottle",
    description: "A durable water bottle to keep you hydrated.",
    price: 9.99,
    options: [
      { name: "Color", values: ["Black", "White", "Green", "Blue", "Pink"] },
      { name: "Text", values: null }
    ],
    image: bottleBlack,
    images: {
      Black: bottleBlack,
      White: bottleWhite,
      Green: bottleGreen,
      Blue: bottleBlue,
      Pink: bottlePink
    }
  },
  {
    product: "Sticker",
    description: "A fun sticker with various size options.",
    price: 3.99, 
    options: [
      { name: "Pattern", values: ["Pattern1", "Pattern2", "Pattern3"] }
    ],
    image: sticker1,
    images: {
      Pattern1: sticker1,
      Pattern2: sticker2,
      Pattern3: sticker3
    }
  },
  {
    product: "Gym Bag",
    description: "A stylish gym bag for your workouts.", 
    price: 29.99,
    options: [
      { name: "Text", values: null }
    ],
    image: gymBag,
  },
  {
    product: "Gift Card",
    description: "A digital gift card for our store.",
    price: [10.00, 20.00, 50.00, 100.00],
    options: [], 
    image: giftCard,
  }
];
