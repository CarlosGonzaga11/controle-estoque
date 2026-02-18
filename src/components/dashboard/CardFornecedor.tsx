/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delete, Edit, Mail, MapPin, Phone, Truck } from "lucide-react";
import type { CardFornecedorProps } from "../../types/Fornecedor";

export default function CardFornecedor({
  email,
  endereco,
  nome,
  telefone,
  remove,
}: CardFornecedorProps) {
  return (
    <div
      className="  
    rounded
  bg-white/60 backdrop-blur
    p-2
    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-out
    hover:-translate-y-2
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
    grid grid-cols-[2fr_3fr_2fr_1fr_80px] 
"
    >
      <div className="flex gap-2 items-center">
        <Truck className="text-[#7557A5]" size={20} />
        <p className="font-medium text-md">{nome}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <span>
            <Mail className="text-[#7557A5]" size={16} />
          </span>
          <p className="font-light">{email}</p>
        </div>

        <div className="flex items-center gap-2 ">
          <span>
            <Phone className="text-[#7557A5]" size={16} />
          </span>
          <p>{telefone}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span>
          <MapPin className="text-red-500 animate-bounce" size={16} />
        </span>
        <span>{endereco}</span>
      </div>
      <div className=" flex gap-2 items-center">
        <span>1</span>
      </div>
      <div className="flex gap-4 items-center">
        <Delete
          onClick={remove}
          size={16}
          className="cursor-pointer opacity-70 hover:opacity-100"
        />
        <Edit
          size={16}
          className="cursor-pointer opacity-70 hover:opacity-100"
        />
      </div>
    </div>
  );
}
