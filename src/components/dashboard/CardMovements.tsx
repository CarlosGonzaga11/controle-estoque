import type { CardMovementsProps } from "../../types/Movements";

export default function CardMovements({
  tipo,
  produto,
  quantidade,
  motivo,
}: CardMovementsProps) {
  return (
    <div
      className={`  grid grid-cols-[1fr_1fr_1fr_2fr_2fr] px-4 py-3 items-center text-sm rounded
        
        backdrop-blur
    p-5
    border border-[#afdc9f]
    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-1  
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
        ${tipo === "saida" ? `bg-[#FB5955] ` : `bg-[#3FF078]`}`}
    >
      <div className="p-2">
        <span
          className={` p-2 rounded text-white ${
            tipo === "saida" ? `bg-[#FA241E] ` : `bg-[#19f500]`
          }`}
        >
          {tipo}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col leading-tight">
          <span className="font-medium">{produto}</span>
          <span className="text-xs text-muted-foreground">Código interno</span>
        </div>
      </div>
      <div className="p-2 rounded">{quantidade}</div>

      <span>{motivo} </span>

      <div className="flex flex-col leading-tight">
        <span className="font-bold">25/01/2911</span>
        <span className="text-xs text-destructive">14:59</span>
      </div>
    </div>
  );
}
