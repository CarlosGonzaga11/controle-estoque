import type { ReactNode } from "react";

type HexColor = `#${string}`;
export type CardMetric = {
  title: string;
  valor: number;
  icone: ReactNode;
  metric: ReactNode;
  percentage: number;
  color: HexColor;
};
export default function CardMetric({
  title,
  valor,
  icone,
  metric,
  percentage,
  color,
}: CardMetric) {
  return (
    <div
      style={{ borderLeftColor: color }}
      className={`flex flex-col items-start justify-between
    rounded-2xl
    bg-white/90 backdrop-blur
    p-5
    border-l-2
    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-2
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
    
      
 `}
    >
      <div className="flex  w-full justify-between">
        <div className="flex flex-col">
          <p className="text-[12px] font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold">{valor}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
          {icone}
        </div>
      </div>
      <div className="">
        {metric ? (
          <div className="text-[10px] flex gap-1 items-center">
            <span className="">{metric}</span> {percentage}
            <p className="text-light text-[#767272]">% vs mẽs anterior</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
