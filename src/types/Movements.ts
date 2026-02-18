export type MovementsProps = {
  id: string;
  tipo: "entrada" | "saida";
  produto: string;
  quantidade: number;
  motivo: string;
  observacao?: string;
};
export type MovementsInput = Omit<MovementsProps, "id">;

export type CardMovementsProps = {
  tipo: string;
  produto: string;
  quantidade: number;
  motivo: string;
};
