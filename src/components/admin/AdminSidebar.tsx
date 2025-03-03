import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Building, 
  User, 
  FileText, 
  UserCircle, 
  Newspaper, 
  ChevronRight,
  Home,
  Settings,
  LogOut,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAuth();
  
  const clientPages = [
    { 
      path: "/admin/client/observatory", 
      title: "Observatório",
      icon: <BookOpen className="h-4 w-4" />
    },
    { 
      path: "/admin/client/researcher", 
      title: "Pesquisador",
      icon: <UserCircle className="h-4 w-4" />
    },
    { 
      path: "/admin/client/politician", 
      title: "Político",
      icon: <User className="h-4 w-4" />
    },
    { 
      path: "/admin/client/institution", 
      title: "Instituição",
      icon: <Building className="h-4 w-4" />
    },
    { 
      path: "/admin/client/journalist", 
      title: "Jornalista",
      icon: <FileText className="h-4 w-4" />
    },
    { 
      path: "/admin/client/press", 
      title: "Assessoria de Imprensa",
      icon: <Newspaper className="h-4 w-4" />
    },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/admin"
    },
    {
      title: "Gerenciar Clientes",
      icon: <UserPlus className="h-4 w-4" />,
      path: "/admin/clients"
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
      title: "Configurações",
      icon: <Settings className="h-4 w-4" />,
      path: "/admin/settings"
    }
  ];
  
  return (
    <div className="w-64 bg-card border-r h-screen p-4 flex flex-col">
      <div className="flex items-center justify-center p-4 border-b">
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      <nav className="flex-1 py-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
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
