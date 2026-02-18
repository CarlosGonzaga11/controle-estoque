import CardMetric from "../components/dashboard/CardMetric";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import Estoque from "../components/alertEstoque/estoque";
import MovementsRecents from "../components/movRecents/movemensRecents";
import { useProducts } from "../hook/useProduct";
import { calcEstoque } from "../utils/calcEstoque";
import { useMovementsContext } from "../hook/useMovements";
import { calcValorTotal, calcValorUnit } from "../utils/calcValor";

export default function DashboardPage() {
  const { products } = useProducts();
  const { movements } = useMovementsContext();
  const estoque = calcEstoque(products, movements);

  const produtosEmAlerta = products.filter((item) => {
    const estoqueProduto = estoque.find((e) => e.produto === item.nome);
    if (!estoqueProduto) return false;
    return estoqueProduto.quantidade <= item.estoque_minimo;
  });

  console.log("calcvalor", calcValorUnit(movements, products));
  console.log("valortotal", calcValorTotal(movements, products));

  return (
    <div className="bg-[#EAEBEA] px-4">
      <div>
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <h5 className="font-light text-sm">
          Bem-vindo, Aqui está o resumo do seu estoque.
        </h5>

        <main className="">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <CardMetric
              title="Total de Produtos"
              valor={products.length}
              icone={<Package className="text-[#4C386B]" />}
              metric={<TrendingUp className="w-4 h-4 text-green-600" />}
              color="#4C386B"
              percentage={12}
            />

            <CardMetric
              title="Estoque Baixo"
              valor={produtosEmAlerta.length}
              icone={<AlertTriangle className="text-[#FD000B]" />}
              metric=""
              color="#FD000B"
              percentage=""
            />
            <CardMetric
              title="Valor Total"
              valor={calcValorTotal(movements, products)}
              icone={<DollarSign className="text-[#22F712]" />}
              metric=""
              color="#22F712"
              percentage=""
            />
            <CardMetric
              title="Movimentações "
              valor={movements.length}
              icone={<TrendingUp className="text-[#4C386B]" />}
              metric=""
              color="#4C386B"
              percentage=""
            />
          </div>
          {/* Alerta*/}
          <Estoque />
          {/* container do movimentacoes recentes */}
          <MovementsRecents />
        </main>
      </div>
    </div>
  );
}
