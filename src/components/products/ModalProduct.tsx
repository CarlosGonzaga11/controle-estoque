import { useState } from "react";
import { useProducts } from "../../hook/useProduct";
import { useCategorieContext } from "../../hook/useCategories";
import { useFornecedorContext } from "../../hook/useFornecedor";

type ModalProps = {
  handleOpenModal: () => void;
};
export default function ModalProducts({ handleOpenModal }: ModalProps) {
  const { products, addProduct } = useProducts();
  const { categories } = useCategorieContext();
  const { fornecedores } = useFornecedorContext();
  const [form, setForm] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    categoriaId: "",
    fornecedorId: "",
    preco_c: "",
    preco_v: "",
    quantidade: "",
    localizacao: "",
    estoque_minimo: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    addProduct({
      id: Date.now(),
      codigo: Number(form.codigo),
      nome: form.nome,
      descricao: form.descricao,
      categoriaId: Number(form.categoriaId),
      fornecedorId: Number(form.fornecedorId),
      preco_c: Number(form.preco_c),
      preco_v: Number(form.preco_v),
      quantidade: Number(form.quantidade),
      estoque_minimo: Number(form.estoque_minimo),
      localizacao: form.localizacao,
    });
    console.log(products);
    handleOpenModal();
  }

  return (
    <div className="border p-4 rounded-lg max-h-screen overflow-y-auto text-sm">
      <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>

      {/* Código / Nome */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Código*</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs">Nome*</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-1 mt-3">
        <label className="text-xs">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="border border-gray-200 rounded px-2 py-1 h-20 resize-none"
        />
      </div>

      {/* Categoria / Fornecedor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Categoria</label>
          {categories.length !== 0 ? (
            <select className="border border-gray-200  rounded px-2 h-9">
              {categories.map((item) => (
                <option
                  className="border border-gray-200 rounded px-2 h-9"
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <input className="border border-gray-200 rounded px-2 h-9" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs">Fornecedor</label>

          {fornecedores.length !== 0 ? (
            <select className="border border-gray-200 rounded px-2 h-9">
              {fornecedores.map((item) => (
                <option key={item.nome} value={item.nome}>
                  {item.nome}
                </option>
              ))}
            </select>
          ) : (
            <input className="border border-gray-200 rounded px-2 h-9" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Preço de Custo (R$)</label>
          <input
            name="preco_c"
            value={form.preco_c}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs">Preço de Venda (R$)</label>
          <input
            name="preco_v"
            value={form.preco_v}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Quantidade</label>
          <input
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            type="number"
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs">Estoque Minimo</label>
          <input
            name="estoque_minimo"
            value={form.estoque_minimo}
            onChange={handleChange}
            type="number"
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs">Localização</label>
          <input
            name="localizacao"
            value={form.localizacao}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="border border-red-300 p-2 rounded bg-red-500 text-white"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="border border-green-500 rounded bg-[#28f774] text-white"
        >
          SALVAR TUDO
        </button>
      </div>
    </div>
  );
}
