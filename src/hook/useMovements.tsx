import { useContext } from "react";
import { MovementsContext } from "../context/useMovementsContext";

export function useMovementsContext() {
  const context = useContext(MovementsContext);
  if (!context) {
    throw new Error(
      "useMovementsContext deve ser usado dentro de Movements Provider"
    );
  }
  return context;
}
