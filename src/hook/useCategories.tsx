import { useContext } from "react";
import { CategorieContext } from "../context/useCategoryContext";

export function useCategorieContext() {
  const context = useContext(CategorieContext);
  if (!context) {
    throw new Error(
      "useMovementsContext deve ser usado dentro de Movements Provider"
    );
  }
  return context;
}
