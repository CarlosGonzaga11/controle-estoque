import { useContext } from "react";
import { FornecedorContext } from "../context/useFornecedorContext";

export function useFornecedorContext() {
  const context = useContext(FornecedorContext);

  if (!context) {
    throw new Error(
      "useFornecedorContext deve ser usado dentro de FornecedorProvider"
    );
  }

  return context;
}
