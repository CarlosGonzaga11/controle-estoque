export type Product = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  categoriaId?: string;
  fornecedorId?: string;
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

export type ProductsInput = Omit<Product, "id">;
