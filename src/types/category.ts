export type CategoriesProps = {
  id: string;
  nome: string;
  observacao?: string;
  color: string;
};
export type CategorieInput = Omit<CategoriesProps, "id">;

export type CategorieCardProps = {
  nome: string;
  color: string;
  observacao: string;
};
