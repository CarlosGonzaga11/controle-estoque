import { useCategorieContext } from "../../hook/useCategories";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalCategoria = {
  handleOpenModal: () => void;
};
export default function ModalCategories({ handleOpenModal }: ModalCategoria) {
  const { addCategories } = useCategorieContext();

  const CategorySchema = z.object({
    nome: z.string().trim().min(1, "Nome é obrigatório"),
    color: z.string(),
    observacao: z.string().optional(),
  });

  type CategorieFormData = z.infer<typeof CategorySchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorieFormData>({
    resolver: zodResolver(CategorySchema),
  });
  function handleSave(data: CategorieFormData) {
    addCategories(data);
    console.log(data);
    handleOpenModal();
  }
  return (
    <div className="border border-gray-200 p-3 rounded-md text-xs max-h-screen overflow-y-auto">
      <form onSubmit={handleSubmit(handleSave)}>
        <h3 className="text-lg font-semibold mb-2">Nova Categoria</h3>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-xs">Nome</label>
            <input
              {...register("nome")}
              className="border border-gray-200 rounded px-2 h-8"
            />
            {errors.nome && (
              <span className="text-red-500">{errors.nome.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-0.5 mb-2">
            <label className="text-xs">Observação</label>
            <textarea
              {...register("observacao")}
              className="border border-gray-200 rounded px-2 py-1 h-14 resize-none"
            />

            <label className="text-xs">Escolha a cor da categoria</label>
            <input
              {...register("color")}
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
            type="submit"
            className="border border-green-500 rounded bg-[#28f774] text-white w-full"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
