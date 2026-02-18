type CardAlertaEstoqueProps = {
  key: number;
  nome: string;
  estoque_minimo: number;
  estoqueProduto: {
    quantidade: number;
  };
};
export default function CardAlertaEstoque({
  key,
  nome,
  estoqueProduto,
  estoque_minimo,
}: CardAlertaEstoqueProps) {
  return (
    <div
      key={key}
      className="flex justify-between bg-red-200 rounded border border-[#F97C7B] shadow-lg items-center"
    >
      <div className="flex flex-col px-4 py-2 ">
        <span className="font-medium text-xl">{nome}</span>
        <span className="text-xs font-light">
          Minímo: {estoque_minimo} unidades
        </span>
      </div>

      <div className="flex flex-col px-4 py-2">
        <span className="font-bold">{estoqueProduto.quantidade}</span>
        <span className="text-xs font-light">Em estoque</span>
      </div>
    </div>
  );
}
