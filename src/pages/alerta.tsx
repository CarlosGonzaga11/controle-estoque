import { useProducts } from "../hook/useProduct";
import { useMovementsContext } from "../hook/useMovements";
import { calcEstoque } from "../utils/calcEstoque";
import { AlertTriangle } from "lucide-react";
import CardAlerta from "../components/dashboard/CardAlertaPage";
import CardAlertaEstoque from "../components/dashboard/CardAlertaEstoque";

export default function AlertaPage() {
  const { products } = useProducts();
  const { movements } = useMovementsContext();

  const estoque = calcEstoque(products, movements);

  return (
    <div>
      <header className=" flex justify-between">
        <div className=" mb-8 ">
          <h2 className="font-bold text-2xl pb-2">Alertas de Estoque</h2>
          <h5 className="font-light text-sm">
            Monitore produtos com estoque baixo
          </h5>
        </div>
      </header>
      <section>
        <div className="grid sm:grid-cols-3 gap-4 grid-cols-1">
          <CardAlerta />
        </div>
      </section>
      <section className="py-8 ">
        <div className="shadow-lg p-4 rounded bg-red-400">
          <div className="flex gap-4 items-center py-4">
            <span className="border border-white rounded p-2">
              <AlertTriangle size={24} />
            </span>
            <span className="text-2xl font-bold">Alertas Críticos</span>
          </div>

          {products.map((item) => {
            const estoqueProduto = estoque.find((e) => e.produto === item.nome);
            if (!estoqueProduto) return null;
            return (
              <CardAlertaEstoque
                key={item.id}
                nome={item.nome}
                estoque_minimo={item.estoque_minimo}
                estoqueProduto={estoqueProduto}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
