import { Plus } from "lucide-react";
import { useState } from "react";
import CardFornecedor from "../components/dashboard/CardFornecedor";
import ModalFornecedor from "../components/fornecedor/ModalFornecedor";
import { useFornecedorContext } from "../hook/useFornecedor";
import NewButton from "../components/dashboard/NewButton";

export default function FornecedorPage() {
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const { fornecedores, removeFornecedor } = useFornecedorContext();
  function handleOpenModal() {
    setOpenModal(!openModal);
  }
  const filterFornecedor = fornecedores.filter((forn) =>
    forn.nome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <header className=" flex justify-between">
        <div className="mb-8">
          <h2 className="font-bold text-2xl pb-2">Fornecedores</h2>
          <p className="text-sm">Gerencie seus fornecedores</p>
        </div>
        <div className="items-center flex gap-2">
          <NewButton
            text="Novo Fornecedor"
            onClick={handleOpenModal}
            icon={<Plus size={16} />}
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
        <div className="grid grid-cols-[2fr_3fr_2fr_1fr_80px] px-4 py-2 font-medium text-sm border-b">
          <span>Fornecedor</span>
          <span>Contato</span>
          <span>Endereço</span>
          <span>Produtos</span>
          <span></span>
        </div>
        <div className="flex flex-col gap-1">
          {filterFornecedor.map((item) => (
            <CardFornecedor
              nome={item.nome}
              email={item.email}
              telefone={item.telefone}
              endereco={item.endereco}
              remove={() => removeFornecedor(item.id)}
            />
          ))}
        </div>
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOpenModal}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-fade-in">
              <ModalFornecedor handleOpenModal={handleOpenModal} />
            </div>
          </div>
        )}{" "}
      </section>
    </div>
  );
}
