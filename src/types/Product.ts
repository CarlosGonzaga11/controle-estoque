export type Product = {
  id: number;
  codigo: number;
  nome: string;
  descricao: string;
  categoriaId: number;
  fornecedorId: number;
  preco_c: number;
  preco_v: number;
  quantidade: number;
  estoque_minimo: number;
  localizacao: string;
};

export type CardProduct = {
  codigo: number;
  produto: string;
  categoria: number;
  estoque: number;
  quantidade: number;
  preco_c: number;
  preco_v: number;
  remove: () => void;
};
