import { Box, Delete, Edit } from "lucide-react";
import type { CardProduct } from "../../types/Product";

export default function CardProduct({
  codigo,
  produto,
  categoria,
  quantidade,
  estoque,
  preco_c,
  preco_v,
  remove,
}: CardProduct) {
  return (
    <div
      className="
  backdrop-blur
     p-2
    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
     grid grid-cols-[1fr_3fr_2fr_1fr_2fr_40px_40px] px-4 py-3 items-center text-sm  rounded  bg-amber-300"
    >
      <span className="font-bold">001</span>

      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500 rounded">
          <Box size={16} className="text-white" />
        </div>
        <div className="flex flex-col leading-tight ">
          <span className="font-medium text-sm">{produto}</span>
          <span className="font-light text-xs">{codigo}</span>
        </div>
      </div>

      <span>{categoria}</span>

      <div className="flex flex-col leading-tight">
        <span className="font-bold text-sm">
          {quantidade === 0 ? "zerado" : quantidade}
        </span>
        <span className="text-xs font-light">{estoque}</span>
      </div>

      <div className="flex flex-col text-xs">
        <span>
          <span className="opacity-70">Custo:</span> R$ {preco_c}
        </span>
        <span>
          <span className="opacity-70">Venda:</span> R$ {preco_v}
        </span>
      </div>

      <Delete
        size={16}
        className="cursor-pointer opacity-70  z-90"
        onClick={remove}
      />

      <Edit size={16} className="cursor-pointer opacity-70 hover:opacity-100" />
    </div>
  );
}
