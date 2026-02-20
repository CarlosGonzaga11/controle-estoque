import type { ReactNode } from "react";

type CardAlertaProps = {
  tipo: string;
  quantidade: number;
  icon: ReactNode;
};

export default function CardAlerta({
  tipo,
  quantidade,
  icon,
}: CardAlertaProps) {
  return (
    <div
      className={`
        rounded-2xl
p-5
border-l-2
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
transition-all duration-300 ease-out
hover:-translate-y-2
hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      flex gap-4  items-center 
      ${
        tipo == "Danger"
          ? "bg-red-100"
          : tipo == "Normal"
          ? "bg-[#7557A5]"
          : "bg-green-100"
      }
      `}
    >
      <div className="p-2  rounded bg-gray-200">{icon}</div>
      <div className="flex flex-col gap-1 ">
        <span>{tipo}</span>
        <span className="font-light">{quantidade}</span>
      </div>
    </div>
  );
}
