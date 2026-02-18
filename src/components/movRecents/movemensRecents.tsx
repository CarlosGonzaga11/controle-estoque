import { ArrowLeftRight } from "lucide-react";
import RecentsMovements from "../dashboard/CardRecentsMovements";
import { useMovementsContext } from "../../hook/useMovements";

export default function MovementsRecents() {
  const { movements } = useMovementsContext();
  return (
    <section className=" rounded px-4 py-2 gap-1  flex flex-col">
      <div className="flex px-2 gap-4 items-center ">
        <span className="bg-[#9780BC] p-2 rounded">
          <ArrowLeftRight className="text-white" />
        </span>
        <h4 className="font-bold text-xl">Movimentações Recentes</h4>
      </div>
      <div className="px-2 flex gap-1 py-2 flex-col-reverse">
        {movements.map((item) => (
          <RecentsMovements
            name={item.produto}
            type={item.tipo}
            valor={item.quantidade}
          />
        ))}
      </div>
    </section>
  );
}
