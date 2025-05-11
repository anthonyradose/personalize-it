import type { Product } from "../types";
import { products } from "../data/products";

export function getProductByName(name: string): Product | undefined {
  return products.find((p) => p.product === name);
}
