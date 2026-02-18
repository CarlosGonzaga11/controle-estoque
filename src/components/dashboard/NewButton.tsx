import type { ReactNode } from "react";

type NewButtonProps = {
  text: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function NewButton({ text, icon, onClick }: NewButtonProps) {
  return (
    <div className="border flex items-center gap-2 py-1 px-4  border-[#553b7d] bg-[#7557A5] shadow-lg text-white  hover:text-black  transition-all duration-150 text-sm rounded-sm">
      {icon}
      <button onClick={onClick}>{text}</button>
    </div>
  );
}
