export type FornecedorProps = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  pessoa_contato: string;
  observacao?: string;
};
export type FornecedorInput = Omit<FornecedorProps, "id">;

export type CardFornecedorProps = {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  remove: () => void;
  // observacao: string;
  // pessoa_contato: string;
};
