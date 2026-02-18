import { AlertTriangle } from "lucide-react";
import { useProducts } from "../../hook/useProduct";
import { useMovementsContext } from "../../hook/useMovements";
import { calcEstoque } from "../../utils/calcEstoque";
import CardAlertaEstoque from "../dashboard/CardAlertaEstoque";

export default function Estoque() {
  const { products } = useProducts();
  // const [itemsEmAlerta, setItemsEmAlerta] = useState<Product[]>([]);
  const { movements } = useMovementsContext();
  const estoque = calcEstoque(products, movements);

  const produtosEmAlerta = products.filter((item) => {
    const estoqueProduto = estoque.find((e) => e.produto === item.nome);
    if (!estoqueProduto) return false;
    return estoqueProduto.quantidade <= item.estoque_minimo;
  });
  return (
    <div
      className="px-6 border-t border-b   py-6 rounded
  border-gray-300"
    >
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-4 items-center">
          <span className="p-2 bg-[#FD000B] rounded">
            <AlertTriangle className=" text-white" size={24} />
          </span>
          <h4 className="font-semibold text-xl">Alerta de Estoque</h4>
        </div>
      </div>
      <div className="gap-1 flex flex-col">
        {produtosEmAlerta.length !== 0 ? (
          produtosEmAlerta.map((item) => {
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
          })
        ) : (
          <div className="font-light text-sm">
            Nehum produto está em falta no momento
          </div>
        )}
      </div>
    </div>
  );
}
