
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Users, 
  FileText,
  Home,
  LogOut,
  UserPlus,
  Mail,
  Eye,
  Settings,
  RotateCcw,
  Database
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
      title: "Gerenciar Clientes",
      icon: <UserPlus className="h-4 w-4" />,
      path: "/admin/clients"
    },
    {
      title: "Contatos de Mídia",
      icon: <Mail className="h-4 w-4" />,
      path: "/admin/contacts"
    },
    {
      title: "Releases e Reportagens",
      icon: <FileText className="h-4 w-4" />,
      path: "/admin/releases"
    },
    {
      title: "Visualizar Área Cliente",
      icon: <Users className="h-4 w-4" />,
      path: "/dashboard"
    }
  ];
  
  const workspaceTools = [
    {
      title: "Visualizar como Cliente",
      icon: <Eye className="h-4 w-4" />,
      path: "/admin/impersonate"
    },
    {
      title: "Editar Configurações",
      icon: <Settings className="h-4 w-4" />,
      path: "/admin/workspace-settings"
    },
    {
      title: "Resetar Workspace",
      icon: <RotateCcw className="h-4 w-4" />,
      path: "/admin/reset-workspace"
    },
    {
      title: "Acessar Dados Crus",
      icon: <Database className="h-4 w-4" />,
      path: "/admin/raw-data"
    }
  ];
  
  return (
    <div className="w-64 bg-card border-r h-screen p-4 flex flex-col">
      <div className="flex items-center justify-center p-4 border-b">
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      <nav className="flex-1 py-4">
        <div className="mb-4">
          <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">Navegação Principal</h3>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start mb-2 relative group"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">Gerenciamento de Workspace</h3>
          {workspaceTools.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start mb-2 relative group"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          ))}
        </div>
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
