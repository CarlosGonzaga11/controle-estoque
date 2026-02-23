import { Archive, Boxes, Delete, Edit } from "lucide-react";
import type { CategorieCardProps } from "../../types/category";

export default function CardCategories({
  observacao,
  color,
  nome,
}: CategorieCardProps) {
  return (
    <div
      className="
      rounded
     bg-white/60 backdrop-blur
    p-5
    border 
    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-2
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
    grid grid-cols-[2fr_2fr_100px] px-4 py-3 items-center text-sm border-b border-gray-200"
    >
      <div className="flex items-center">
        <div className="p-2 rounded bg-gray-200">
          <Boxes color={color} size={16} />
        </div>
        <div>
          <span className="p-2 rounded">{nome}</span>
        </div>
      </div>
      <div>
        <span className=" text-gray-500">
          {observacao ? observacao : "Nenhuma observação"}
        </span>
      </div>

      <div className="flex gap-8 items-center px-2">
        <span>
          <Delete size={16} />
        </span>
        <span>
          <Edit size={16} />
        </span>
      </div>
    </div>
  );
}
