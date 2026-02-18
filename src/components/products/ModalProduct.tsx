import { useProducts } from "../../hook/useProduct";
import { useCategorieContext } from "../../hook/useCategories";
import { useFornecedorContext } from "../../hook/useFornecedor";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalProps = {
  handleOpenModal: () => void;
};
export default function ModalProducts({ handleOpenModal }: ModalProps) {
  const { addProduct } = useProducts();
  const { categories } = useCategorieContext();
  const { fornecedores } = useFornecedorContext();

  const productSchema = z.object({
    codigo: z.string(),

    nome: z.string().trim().min(1, "Nome é obrigatório"),

    descricao: z.string(),

    categoriaId: z.string().min(1, "Categoria obrigatória"),

    fornecedorId: z.string().min(1, "Fornecedor obrigatório"),

    preco_c: z
      .number()
      .refine((v) => !isNaN(v), { message: "Preço inválido" })
      .min(0.01, "Preço deve ser maior que 0"),

    preco_v: z
      .number()
      .refine((v) => !isNaN(v), { message: "Preço inválido" })
      .min(0.01, "Preço deve ser maior que 0"),

    quantidade: z
      .number()
      .refine((v) => !isNaN(v), { message: "Quantidade inválida" })
      .int("Deve ser inteiro")
      .min(1, "Quantidade mínima é 1"),

    estoque_minimo: z
      .number()
      .refine((v) => !isNaN(v), { message: "Estoque mínimo inválido" })
      .int("Deve ser inteiro")
      .min(1, "Estoque mínimo deve ser maior que 0"),

    localizacao: z.string(),
  });

  type ProductsFormData = z.infer<typeof productSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductsFormData>({
    resolver: zodResolver(productSchema),
  });

  function handleSave(data: ProductsFormData) {
    console.log("cliquei");
    addProduct(data);
    console.log(data);
    handleOpenModal();
  }

  return (
    <div className="border p-4 rounded-lg max-h-screen overflow-y-auto text-sm">
      <form onSubmit={handleSubmit(handleSave)}>
        <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs">Código*</label>
            <input
              {...register("codigo")}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.codigo && (
              <span className="text-red-500">{errors.codigo.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs">Nome*</label>
            <input
              {...register("nome")}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.nome && (
              <span className="text-red-500">{errors.nome.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label className="text-xs">Descrição</label>
          <textarea
            {...register("descricao")}
            className="border border-gray-200 rounded px-2 py-1 h-20 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs">Categoria</label>
            {categories.length !== 0 ? (
              <select
                {...register("categoriaId")}
                className="border border-gray-200  rounded px-2 h-9"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((item) => (
                  <option
                    className="border border-gray-200 rounded px-2 h-9"
                    value={item.nome}
                  >
                    {item.nome}
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
              <select
                {...register("fornecedorId")}
                className="border border-gray-200 rounded px-2 h-9"
              >
                <option value="">Selecione um fornecedor</option>
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
              {...register("preco_c", { valueAsNumber: true })}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.preco_c && (
              <span className="text-red-500">{errors.preco_c.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs">Preço de Venda (R$)</label>
            <input
              {...register("preco_v", { valueAsNumber: true })}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.preco_v && (
              <span className="text-red-500">{errors.preco_v.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs">Quantidade</label>
            <input
              {...register("quantidade", { valueAsNumber: true })}
              type="number"
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.quantidade && (
              <span className="text-red-500">{errors.quantidade.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs">Estoque Minimo</label>
            <input
              {...register("estoque_minimo", { valueAsNumber: true })}
              type="number"
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.estoque_minimo && (
              <span className="text-red-500">
                {errors.estoque_minimo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs">Localização</label>
            <input
              {...register("localizacao")}
              className="border border-gray-200 rounded px-2 h-9"
            />
            {errors.localizacao && (
              <span className="text-red-500">{errors.localizacao.message}</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="border border-red-300 p-2 rounded bg-red-500 text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="border border-green-500 rounded bg-[#28f774] text-white"
          >
            SALVAR TUDO
          </button>
        </div>
      </form>
    </div>
  );
}
