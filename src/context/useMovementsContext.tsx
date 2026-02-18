import { createContext, useState } from "react";
import type { MovementsInput, MovementsProps } from "../types/Movements";

/**criando tipo pro context */
export type MovementsContextType = {
  movements: MovementsProps[];
  addMovements: (movements: MovementsInput) => void;
  removeMovements: (id: string) => void;
};

/** tipar o context */
// eslint-disable-next-line react-refresh/only-export-components
export const MovementsContext = createContext<MovementsContextType | null>(
  null
);

/*criar o provider */

export function MovementsProvider({ children }: { children: React.ReactNode }) {
  const [movements, setMovements] = useState<MovementsProps[]>([]);
  function addMovements(movements: MovementsInput) {
    const newMovement = { id: crypto.randomUUID(), ...movements };
    setMovements((prev) => [...prev, newMovement]);
  }

  function removeMovements(id: string) {
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
