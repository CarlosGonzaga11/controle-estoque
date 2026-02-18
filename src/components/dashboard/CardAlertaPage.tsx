import { Bell } from "lucide-react";

export default function CardAlerta() {
  return (
    <div
      className="
        rounded-2xl
bg-white/90 backdrop-blur
p-5
border-l-2
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
transition-all duration-300 ease-out
hover:-translate-y-2
hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      flex gap-4  items-center "
    >
      <div className="p-2  rounded bg-gray-200">
        <Bell className="text-red-500" size={24} />
      </div>
      <div className="flex flex-col gap-1 ">
        <span className="font-medium text-lg">Atenção</span>
        <span className="font-light">valor</span>
      </div>
    </div>
  );
}
