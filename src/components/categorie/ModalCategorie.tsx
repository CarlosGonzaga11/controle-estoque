import { useState } from "react";
import { useCategorieContext } from "../../hook/useCategories";

type ModalCategoria = {
  handleOpenModal: () => void;
};
export default function ModalCategories({ handleOpenModal }: ModalCategoria) {
  const { categories, addCategories } = useCategorieContext();
  const [formCategorie, setFormCategorie] = useState({
    name: "",
    observacao: "",
    color: "",
  });
  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormCategorie((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    addCategories({
      name: formCategorie.name,
      observacao: formCategorie.observacao,
      color: formCategorie.color,
      id: Date.now(),
    });
    console.log("salvei minha categoria", categories);
    handleOpenModal();
  }
  return (
    <div className="border p-3 rounded-md text-xs max-h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Nova Categoria</h3>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <label>Nome*</label>
          <input
            name="name"
            value={formCategorie.name}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-8"
          />
        </div>

        <div className="flex flex-col gap-0.5 mb-2">
          <label>Observações</label>
          <textarea
            name="observacao"
            value={formCategorie.observacao}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 py-1 h-14 resize-none"
          />

          <label>cor</label>
          <input
            name="color"
            value={formCategorie.color}
            onChange={handleChange}
            type="color"
            className="rounded"
          ></input>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="border border-red-300 p-2 rounded bg-red-500 text-white w-full"
          onClick={handleOpenModal}
        >
          Cancelar
        </button>
        <button
          className="border border-green-500 rounded bg-[#28f774] text-white w-full"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
