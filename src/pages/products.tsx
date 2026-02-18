import { Download, Plus } from "lucide-react";
import CardProduct from "../components/dashboard/CardProduct";
import ModalProducts from "../components/products/ModalProduct";
import { useState } from "react";
import NewButton from "../components/dashboard/NewButton";
import { useProducts } from "../hook/useProduct";
import { useMovementsContext } from "../hook/useMovements";
import { calcEstoque } from "../utils/calcEstoque";

export default function ProductsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const { products, removeProduct } = useProducts();
  const { movements } = useMovementsContext();

  const estoque = calcEstoque(products, movements);
  function handleOpenModal() {
    console.log("cliqei");
    setOpenModal(!openModal);
    console.log("lista de produtos", products);
  }

  const lista = products.filter((produto) =>
    produto.nome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <header className=" flex justify-between">
        <div className=" mb-8 ">
          <h2 className="font-bold text-2xl pb-2">Produtos</h2>
          <h5 className="font-light text-sm">
            Gerencie seus produtos e controle o estoque
          </h5>
        </div>
        <div className="items-center flex gap-2">
          <NewButton
            text="exportar"
            icon={<Download size={16} />}
            onClick={handleOpenModal}
          />
          <NewButton
            text="Novo Produto"
            icon={<Plus size={16} />}
            onClick={handleOpenModal}
          />
        </div>
      </header>
      <section>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="-z-50 border border-gray-400 p-1 rounded max-w-3xl w-full text-sm px-2 outline-none focus:border-amber-200"
          placeholder="Buscar por nome ou código..."
        />

        <div className="grid grid-cols-[1fr_3fr_2fr_1fr_2fr_40px_40px] px-4 py-2 font-medium text-sm border-b">
          <span>Código</span>
          <span>Produto</span>
          <span>Categoria</span>
          <span>Estoque</span>
          <span>Preços</span>
          <span></span>
          <span></span>
        </div>

        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOpenModal}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-fade-in">
              <ModalProducts handleOpenModal={handleOpenModal} />
            </div>
          </div>
        )}
        <div className="flex gap-1 flex-col">
          {lista.map((item) => {
            const estoqueProduto = estoque.find((e) => e.produto === item.nome);
            return (
              <CardProduct
                codigo={item.codigo}
                produto={item.nome}
                categoria={item.categoriaId}
                quantidade={estoqueProduto?.quantidade ?? item.quantidade}
                estoque={item.estoque_minimo}
                preco_c={item.preco_c}
                preco_v={item.preco_v}
                remove={() => removeProduct(item.id)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
