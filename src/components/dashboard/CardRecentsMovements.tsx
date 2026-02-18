import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type RecentsMovementsProps = {
  name: string;
  valor: number;
  type: string;
};
export default function RecentsMovements({
  name,
  valor,
  type,
}: RecentsMovementsProps) {
  return (
    <div className="flex gap-2 items-center justify-between border border-[#B9A9D2] bg-[#B893E8] rounded py-2 px-4 ">
      <div className="flex gap-4 items-center">
        <span className=" rounded">
          {type === "entrada" ? (
            <ArrowDownLeft className="bg-[#22F712] text-white rounded" />
          ) : (
            <ArrowUpRight className="bg-[#FD000B] text-white rounded " />
          )}
        </span>
        <div className="flex flex-col">
          <p className="block leading-tight font-semibold text-xl">{name}</p>
          <p className="block leading-tight text-sm font-light">{type}</p>
        </div>
      </div>
      <div>
        <span className="font-bold text-sm ">
          {type === "saida" ? (
            <div className="text-[#FD000B] p-2 rounded">-{valor}</div>
          ) : (
            <div className="p-2 rounded text-gray-300">+{valor}</div>
          )}
        </span>
      </div>
    </div>
  );
}
