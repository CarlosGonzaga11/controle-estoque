import { createContext, useState } from "react";
import type { CategorieInput, CategoriesProps } from "../types/category";

export type CategorieContextType = {
  categories: CategoriesProps[];
  addCategories: (categories: CategorieInput) => void;
  removeCategorie: (id: string) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CategorieContext = createContext<CategorieContextType | null>(
  null
);

export function CategorieProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  function addCategories(categories: CategorieInput) {
    const newCategory = { id: crypto.randomUUID(), ...categories };
    setCategories((prev) => [...prev, newCategory]);
  }
  function removeCategorie(id: string) {
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
