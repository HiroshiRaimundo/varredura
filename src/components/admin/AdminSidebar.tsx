
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Users, 
  FileText,
  Home,
  LogOut,
  UserPlus,
  BarChart2,
  Eye,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAuth();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/admin"
    },
    {
      title: "Monitoramento",
      icon: <Activity className="h-4 w-4" />,
      path: "/admin/monitoring",
      description: "Central de monitoramento do sistema"
    },
    {
      title: "Gerenciar Clientes",
      icon: <UserPlus className="h-4 w-4" />,
      path: "/admin/clients"
    },
    {
      title: "Visualizar Clientes",
      icon: <Eye className="h-4 w-4" />,
      path: "/example-client",
      description: "Visualizar a interface dos clientes para suporte"
    },
    {
      title: "Contatos de Mídia",
      icon: <Users className="h-4 w-4" />,
      path: "/admin/contacts"
    },
    {
      title: "Releases e Reportagens",
      icon: <FileText className="h-4 w-4" />,
      path: "/admin/content"
    },
    {
      title: "Análise e Relatórios",
      icon: <BarChart2 className="h-4 w-4" />,
      path: "/admin/analytics"
    }
  ];
  
  return (
    <div className="w-64 bg-card border-r h-screen p-4 flex flex-col">
      <div className="flex items-center justify-center p-4 border-b">
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full justify-start mb-2 relative group"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
            {item.description && (
              <div className="absolute left-full ml-2 p-2 bg-black text-white text-xs rounded hidden group-hover:block w-48">
                {item.description}
              </div>
            )}
          </Button>
        ))}
      </nav>

      <div className="border-t pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
