import { createContext, useState } from "react";
import type { Product, ProductsInput } from "../types/Product";

export type ProductContextType = {
  products: Product[];
  addProduct: (product: ProductsInput) => void;
  removeProduct: (id: string) => void;
  //   updateProduct: (product: Product) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(products: ProductsInput) {
    const newProduct = { id: crypto.randomUUID(), ...products };
    setProducts((prev) => [...prev, newProduct]);
  }

  function removeProduct(id: string) {
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
