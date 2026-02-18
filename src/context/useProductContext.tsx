import { createContext, useState } from "react";
import type { Product } from "../types/Product";

export type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  //   updateProduct: (product: Product) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(product: Product) {
    setProducts((prev) => [...prev, product]);
  }

  function removeProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  //   function updateProduct(product: Product) {
  //     setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  //   }

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
