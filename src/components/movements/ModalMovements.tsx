import { useState } from "react";
import { useMovementsContext } from "../../hook/useMovements";
import { useProducts } from "../../hook/useProduct";
import { calcEstoque } from "../../utils/calcEstoque";

type ModalMove = {
  handleOpenModal: () => void;
};
export default function ModalMovements({ handleOpenModal }: ModalMove) {
  const { movements, addMovements } = useMovementsContext();
  const [form, setForm] = useState({
    tipo: "entrada" as "entrada" | "saida",
    produto: "",
    quantidade: "",
    motivo: "",
    observacao: "",
  });
  const { products } = useProducts();
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  const estoque = calcEstoque(products, movements);
  function handleSave() {
    addMovements({
      id: Date.now(),
      tipo: form.tipo,
      produto: form.produto,
      quantidade: Number(form.quantidade),
      motivo: form.motivo,
      observacao: form.observacao,
    });
    handleOpenModal();
    console.log("cliquei em salvar", movements);
  }
  return (
    <div className="border border-gray-200  p-4 rounded-lg max-h-screen overflow-y-auto text-sm">
      <h3 className="text-lg font-semibold mb-4">Nova Movimentação</h3>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, tipo: "entrada" }))}
          className={`flex-1 h-10 rounded-lg border text-sm font-medium transition
      ${
        form.tipo === "entrada"
          ? "bg-green-500 text-white border-green-500"
          : "bg-white text-gray-600 border-gray-300 hover:bg-green-50"
      }
    `}
        >
          Entrada
        </button>

        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, tipo: "saida" }))}
          className={`flex-1 h-10 rounded-lg border text-sm font-medium transition
      ${
        form.tipo === "saida"
          ? "bg-red-500 text-white border-red-500"
          : "bg-white text-gray-600 border-gray-300 hover:bg-red-50"
      }
    `}
        >
          Saída
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Produto */}
        <div className="flex flex-col gap-1">
          <label className="text-xs">Produto</label>
          {products.length !== 0 ? (
            <select
              name="produto"
              value={form.produto}
              onChange={handleChange}
              className="border border-gray-200 rounded px-2 h-9"
            >
              <option value="">Selecione um produto</option>
              {products.map((item) => {
                const productEst = estoque.find(
                  (est) => est.produto === item.nome
                );
                if (!productEst) return null;
                return (
                  <option key={item.nome} value={item.nome}>
                    {item.nome} ({productEst.quantidade})
                  </option>
                );
              })}
            </select>
          ) : (
            <div className="font-bold border border-gray-200 ">
              Nenhum produto cadastrado
            </div>
          )}
        </div>

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
          <label className="text-xs">Motivo</label>
          <select
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            className="border border-gray-200 rounded px-2 h-9"
          >
            <option value="">Selecione</option>
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
            <option value="Ajuste">Ajuste</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <label className="text-xs">Observações</label>
        <textarea
          name="observacao"
          value={form.observacao}
          onChange={handleChange}
          className="border border-gray-200 rounded px-2 py-1 h-20 resize-none"
        />
      </div>
      <button onClick={handleSave}>salvar movimentacoes</button>
    </div>
  );
}
