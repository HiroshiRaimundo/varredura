
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";

interface HeaderProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  clientName?: string;
  clientType?: string;
}

const Header = ({ 
  isAuthenticated, 
  onLoginClick, 
  onLogoutClick,
  clientName,
  clientType
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the client page
  const isClientPage = location.pathname.startsWith('/client');

  const getClientTypeLabel = (type?: string) => {
    if (!type) return "";
    
    switch (type) {
      case "observatory": return "Observatório";
      case "researcher": return "Pesquisador";
      case "politician": return "Político";
      case "institution": return "Instituição";
      case "journalist": return "Jornalista";
      case "press": return "Assessoria de Imprensa";
      default: return type;
    }
  };

  return (
    <header className="py-4 mb-6">
      <div className="flex justify-between items-center">
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer flex items-center"
        >
          <span className="text-xl font-bold">Serviços Especializados</span>
        </div>

        <div className="flex items-center gap-2">
          {clientName && clientType && (
            <div className="hidden md:flex items-center mr-4 bg-muted px-3 py-1 rounded-lg">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{clientName}</p>
                <p className="text-xs text-muted-foreground">{getClientTypeLabel(clientType)}</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate("/help")}
          >
            Ajuda
          </Button>
          
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={onLogoutClick}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          ) : (
            <>
              {isClientPage ? (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/client-login")}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Área do Cliente</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/client-login")}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Área do Cliente</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
