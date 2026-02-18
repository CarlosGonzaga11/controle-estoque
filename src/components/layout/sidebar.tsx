import {
  ArrowLeftRight,
  Bell,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const sidebar = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Produtos", href: "/products", icon: Package },
    { name: "Movimentações", href: "/movements", icon: ArrowLeftRight },
    { name: "Categorias", href: "/categories", icon: FolderOpen },
    { name: "Fornecedores", href: "/fornecedor", icon: Truck },
    { name: "Relatórios", href: "/", icon: FileText },
    { name: "Alertas", href: "/alerta", icon: Bell, alert: "1" },
  ];
  const buttonConfig = [
    { name: "Configurações", href: "/configuracoes", icon: Settings },
  ];
  return (
    <div className="">
      <div className="flex-1 space-y-1 px-3 py-4 w-64">
        <div className="flex-1 space-y-1 px-3 mb-8 w-64 text-white text-lg font-semibold tracking-wide">
          Controle De Estoque
        </div>
        {sidebar.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className="flex shadow-2xs px-4 py-2 bg-[#7557A5]  items-center rounded text-white text-sm hover:bg-[#4C386B] transition-all duration-200 ease-in-out"
              key={item.name}
              to={item.href}
            >
              <div className="relative">
                <Icon size={16} />
                <p className="absolute text-[7px] text-black-400 bg-red-500 rounded-full bottom-0 right-0">
                  {item.alert}
                </p>
              </div>

              <span className="px-2">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="flex-1 space-y-1 px-3 py-4 w-64">
        {buttonConfig.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className="flex px-1 py-1bg-[#7557A5] text-white"
              key={item.name}
              to={item.href}
            >
              <Icon />
              <span className="px-2"> {item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
