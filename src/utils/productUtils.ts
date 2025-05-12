import type { Product } from "../types";


export function getProductByName(name: string, products: Product[]): Product | undefined {
  return products.find((p) => p.product === name);
}
