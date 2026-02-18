import { createContext, useState } from "react";
import type { FornecedorInput, FornecedorProps } from "../types/Fornecedor";

export type FornecedorContentType = {
  fornecedores: FornecedorProps[];
  addFornecedor: (fornecedor: FornecedorInput) => void;
  removeFornecedor: (id: string) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const FornecedorContext = createContext<FornecedorContentType | null>(
  null
);

export function FornecedorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fornecedores, setFornecedores] = useState<FornecedorProps[]>([]);

  function addFornecedor(fornecedor: FornecedorInput) {
    const novoFornecedor = { id: crypto.randomUUID(), ...fornecedor };
    setFornecedores((prev) => [...prev, novoFornecedor]);
  }
  function removeFornecedor(id: string) {
    setFornecedores((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FornecedorContext.Provider
      value={{ fornecedores, addFornecedor, removeFornecedor }}
    >
      {children}
    </FornecedorContext.Provider>
  );
}
