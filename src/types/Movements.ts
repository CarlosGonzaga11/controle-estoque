export type MovementsProps = {
  tipo: "entrada" | "saida";
  id: number;
  produto: string;
  quantidade: number;
  motivo: string;
  observacao: string;
};

export type CardMovementsProps = {
  tipo: string;
  produto: string;
  quantidade: number;
  motivo: string;
};
