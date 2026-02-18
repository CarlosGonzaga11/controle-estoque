import { Plus } from "lucide-react";
import CardCategories from "../components/dashboard/CardCategorie";
import ModalCategories from "../components/categorie/ModalCategorie";
import { useState } from "react";
import { useCategorieContext } from "../hook/useCategories";
import NewButton from "../components/dashboard/NewButton";

export default function CategoriesPage() {
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useCategorieContext();
  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <div>
      <header className="flex justify-between">
        <div className="mb-8 ">
          <h2 className="font-bold text-2xl pb-2">Categorias</h2>
          <p className="font-light text-sm">
            Organize seus produtos em categorias
          </p>
        </div>
        <div className=" items-center flex gap-2">
          <NewButton
            text="Nova Categoria"
            onClick={handleOpenModal}
            icon={<Plus size={16} />}
          />
        </div>
      </header>
      <section>
        <input
          className="border border-gray-400 p-1 rounded max-w-3xl w-full text-sm px-2 outline-none focus:border-amber-200"
          placeholder="Buscar por nome ou código..."
        ></input>

        <div className="grid grid-cols-[2fr_2fr_100px] px-4 py-2 font-medium text-sm border-b">
          <span>Categoria</span>
          <span>Observacao</span>
          <span></span>
        </div>
        {categories.map((item) => (
          <CardCategories
            name={item.name}
            color={item.color}
            observacao={item.observacao}
          />
        ))}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOpenModal}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-fade-in">
              <ModalCategories handleOpenModal={handleOpenModal} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
