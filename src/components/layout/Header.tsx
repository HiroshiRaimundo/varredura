
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

  const getClientTypeLabel = (type?: string) => {
    if (!type) return "";
    
    switch (type) {
      case "observatory": return "Observatório";
      case "researcher": return "Pesquisador";
      case "politician": return "Político";
      case "institution": return "Instituição";
      case "journalist": return "Jornalista";
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
          <div className="bg-primary p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="ml-2 text-xl font-bold">Sistema de Monitoramento</span>
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
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/client-login")}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Cliente</span>
              </Button>
              
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={onLoginClick}
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
