import { Plus } from "lucide-react";
import CardMovements from "../components/dashboard/CardMovements";
import { useState } from "react";
import ModalMovements from "../components/movements/ModalMovements";
import { useMovementsContext } from "../hook/useMovements";
import { calcEstoque } from "../utils/calcEstoque";
import { useProducts } from "../hook/useProduct";
import NewButton from "../components/dashboard/NewButton";

export default function MovementsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const { products } = useProducts();
  const { movements } = useMovementsContext();
  function handleOpenModal() {
    setOpenModal(!openModal);
  }
  const filterMove = movements.filter((move) =>
    move.produto.toLowerCase().includes(filter.toLowerCase())
  );
  const estoque = calcEstoque(products, movements);
  console.log("estoque", estoque);
  return (
    <div>
      <header className="flex justify-between">
        <div className="mb-8">
          <h2 className="font-bold text-2xl pb-2">Movimentações</h2>
          <p className="text-sm">Registre entrada e saida de estoques</p>
        </div>
        <div className="items-center flex gap-2">
          <NewButton
            text="Nova Movimentação"
            icon={<Plus size={16} />}
            onClick={handleOpenModal}
          />
        </div>
      </header>
      <section>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-400 p-1 rounded max-w-3xl w-full text-sm px-2 outline-none focus:border-amber-200"
          placeholder="Buscar por nome ou código..."
        ></input>

        <div className="grid grid-cols-[1fr_1fr_1fr_2fr_2fr] px-4 py-2 font-medium text-sm border-b">
          <span>Tipo</span>
          <span>Produto</span>
          <span>Quantidade</span>
          <span>Motivo</span>
          <span>Data</span>
        </div>

        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOpenModal}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-fade-in">
              <ModalMovements handleOpenModal={handleOpenModal} />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          {filterMove.map((item) => (
            <CardMovements
              tipo={item.tipo}
              produto={item.produto}
              quantidade={item.quantidade}
              motivo={item.motivo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
