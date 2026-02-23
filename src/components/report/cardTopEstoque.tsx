type CardTopEstoqueProps = {
  nome: string;
  estoqueProduto: number;
  estoque_minimo: number;
};

export default function CardTopEstoque({
  nome,
  estoqueProduto,
  estoque_minimo,
}: CardTopEstoqueProps) {
  const acimaDoMinimo = estoqueProduto > estoque_minimo;

  return (
    <div className="shadow-lg rounded p-3 flex justify-between items-center bg-white/90 backdrop-blur">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{nome}</span>
        <span className="text-sm text-gray-500">Mínimo: {estoque_minimo}</span>
      </div>

      <div
        className={`font-bold text-lg ${
          acimaDoMinimo ? "text-green-600" : "text-red-600"
        }`}
      >
        {estoqueProduto}
      </div>
    </div>
  );
}
