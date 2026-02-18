import { useState } from "react";
import { useMovementsContext } from "../../hook/useMovements";
import { useProducts } from "../../hook/useProduct";
import { calcEstoque } from "../../utils/calcEstoque";
import { useForm } from "react-hook-form";
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalMove = {
  handleOpenModal: () => void;
};
export default function ModalMovements({ handleOpenModal }: ModalMove) {
  const { movements, addMovements } = useMovementsContext();
  // const [form, setForm] = useState({
  //   tipo: "entrada" as "entrada" | "saida",
  //   produto: "",
  //   quantidade: "",
  //   motivo: "",
  //   observacao: "",
  // });

  const movementsSchema = z.object({
    tipo: z.enum(["entrada", "saida"]),
    produto: z.string(),
    quantidade: z
      .number()
      .int("Quantidade deve ser um número inteiro")
      .positive("Quantidade deve ser um numero maior que 0")
      .min(1, "Quantidade é obrigatório"),
    motivo: z.string().trim().min(1, "Motivo é obrigatório"),
    observacao: z.string().optional(),
  });

  type MovementsFormData = z.infer<typeof movementsSchema>;

  const { products } = useProducts();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MovementsFormData>({
    defaultValues: {
      tipo: "entrada",
    },
    resolver: zodResolver(movementsSchema),
  });

  const tipo = watch("tipo");

  const estoque = calcEstoque(products, movements);

  function handleSave(data: MovementsFormData) {
    addMovements(data);
    console.log("data", data);
    handleOpenModal();
  }
  return (
    <div className="border border-gray-200  p-4 rounded-lg max-h-screen overflow-y-auto text-sm">
      <form onSubmit={handleSubmit(handleSave)}>
        <h3 className="text-lg font-semibold mb-4">Nova Movimentação</h3>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setValue("tipo", "entrada")}
            className={`flex-1 h-10 rounded-lg border text-sm font-medium transition
      ${tipo === "entrada" ? "bg-green-500 text-white" : ""}
    `}
          >
            Entrada
          </button>

          <button
            type="button"
            onClick={() => setValue("tipo", "saida")}
            className={`flex-1 h-10 rounded-lg border text-sm font-medium transition
      ${tipo === "saida" ? "bg-red-500 text-white" : ""}
    `}
          >
            Saída
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs">Produto</label>
            {products.length !== 0 ? (
              <select
                {...register("produto")}
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
              type="number"
              {...register("quantidade", { valueAsNumber: true })}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.quantidade && (
              <span className="text-red-500 text-xs">
                {errors.quantidade.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs">Motivo</label>
            <select
              {...register("motivo")}
              className="border border-gray-200 rounded px-2 h-9"
            >
              <option value="">Selecione</option>
              <option value="Compra">Compra</option>
              <option value="Venda">Venda</option>
              <option value="Ajuste">Ajuste</option>
            </select>
            {errors.motivo && (
              <span className="text-red-500 text-xs">
                {errors.motivo.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label className="text-xs">Observações</label>
          <textarea
            {...register("observacao")}
            className="border border-gray-200 rounded px-2 py-1 h-20 resize-none"
          />
        </div>
        <button type="submit">salvar movimentacoes</button>
      </form>
    </div>
  );
}
