import { Delete, Edit } from "lucide-react";
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
      <div>
        <span className="p-2 rounded" style={{ backgroundColor: color }}>
          {nome}
        </span>
      </div>
      <div>
        <span className="border">{observacao}</span>
      </div>

      <div className="flex gap-8 items-center px-2">
        <span>
          <Delete />
        </span>
        <span>
          <Edit />
        </span>
      </div>
    </div>
  );
}
