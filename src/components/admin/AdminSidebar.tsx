
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
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
  
  return (
    <div className="w-64 border-r h-screen px-4 py-6">
      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Área Administrativa</h2>
        <Button 
          variant="outline" 
          className="w-full justify-start mb-4"
          onClick={() => navigate("/admin")}
        >
          <Users className="h-4 w-4 mr-2" />
          Dashboard Principal
        </Button>
      </div>
      
      <div>
        <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase">Áreas de Cliente</h3>
        <div className="space-y-1">
          {clientPages.map((page) => (
            <Button
              key={page.path}
              variant={isActive(page.path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(page.path)}
            >
              {page.icon}
              <span className="ml-2">{page.title}</span>
              {isActive(page.path) && <ChevronRight className="ml-auto h-4 w-4" />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
