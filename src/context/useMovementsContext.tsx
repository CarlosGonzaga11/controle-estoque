import { createContext, useState } from "react";
import type { MovementsProps } from "../types/Movements";

/**criando tipo pro context */
export type MovementsContextType = {
  movements: MovementsProps[];
  addMovements: (movements: MovementsProps) => void;
  removeMovements: (id: number) => void;
};

/** tipar o context */
// eslint-disable-next-line react-refresh/only-export-components
export const MovementsContext = createContext<MovementsContextType | null>(
  null
);

/*criar o provider */

export function MovementsProvider({ children }: { children: React.ReactNode }) {
  const [movements, setMovements] = useState<MovementsProps[]>([]);
  function addMovements(movements: MovementsProps) {
    setMovements((prev) => [...prev, movements]);
  }

  function removeMovements(id: number) {
    setMovements((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <MovementsContext.Provider
      value={{ movements, addMovements, removeMovements }}
    >
      {children}
    </MovementsContext.Provider>
  );
}
