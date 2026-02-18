import { createContext, useState } from "react";
import type { CategoriesProps } from "../types/category";

export type CategorieContextType = {
  categories: CategoriesProps[];
  addCategories: (categories: CategoriesProps) => void;
  removeCategorie: (id: number) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CategorieContext = createContext<CategorieContextType | null>(
  null
);

export function CategorieProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  function addCategories(categories: CategoriesProps) {
    setCategories((prev) => [...prev, categories]);
  }
  function removeCategorie(id: number) {
    setCategories((prev) => prev.filter((f) => f.id !== id));
  }
  return (
    <CategorieContext.Provider
      value={{ categories, addCategories, removeCategorie }}
    >
      {children}
    </CategorieContext.Provider>
  );
}
