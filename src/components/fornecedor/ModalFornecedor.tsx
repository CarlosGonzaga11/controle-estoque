import z from "zod";
import { useFornecedorContext } from "../../hook/useFornecedor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ModalFornProps = {
  handleOpenModal: () => void;
};
export default function ModalFornecedor({ handleOpenModal }: ModalFornProps) {
  const { addFornecedor } = useFornecedorContext();

  const fornecedorSchema = z.object({
    nome: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.string().trim().email("Email Inválido"),
    telefone: z.string().trim().min(1, "Telefone é obrigatório"),
    pessoa_contato: z.string().trim().min(1, "Pessoa de contato é obrigatório"),
    endereco: z.string().trim().min(1, "Endereço é obrigatório"),
    observacao: z.string().optional(),
  });

  type FornecedorFormData = z.infer<typeof fornecedorSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FornecedorFormData>({
    resolver: zodResolver(fornecedorSchema),
  });

  function onSubmit(data: FornecedorFormData) {
    addFornecedor(data);
    handleOpenModal();
    console.log("?????????", data);
  }

  return (
    <div className="max-h-screen border p-4  overflow-y-auto text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label>Nome *</label>
          <input {...register("nome")} className="border rounded px-2 h-9" />
          {errors.nome && (
            <span className="text-red-500 text-xs">{errors.nome.message}</span>
          )}
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              type="email"
              className="border rounded px-2 h-9"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Telefone</label>
            <input
              {...register("telefone")}
              className="border rounded px-2 h-9"
            />
            {errors.telefone && (
              <span className="text-red-500 text-xs">
                {errors.telefone.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label>Pessoa do Contato</label>
          <input
            {...register("pessoa_contato")}
            className="border rounded px-2 h-9"
          />
          {errors.pessoa_contato && (
            <span className="text-red-500 text-xs">
              {errors.pessoa_contato.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Endereço</label>
          <input
            {...register("endereco")}
            className="border rounded px-2 h-9"
          />
          {errors.endereco && (
            <span className="text-red-500 text-xs">
              {errors.endereco.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Observações</label>
          <textarea
            {...register("observacao")}
            className="border rounded px-2 py-1 h-"
          />
        </div>
        <button type="submit">SALVAR FONRCEDOR</button>
        {/* <button onClick={handleSaveFornecedor}>SALVAR FONRCEDOR</button> */}
      </form>
    </div>
  );
}
