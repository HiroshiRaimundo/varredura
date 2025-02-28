
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRound, LogIn, LogOut, Home, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  onLoginClick, 
  onLogoutClick 
}) => {
  return (
    <header className="flex justify-between items-center mb-8">
      {/* Ícone Home com link para o observatório */}
      <div className="flex items-center">
        <a href="https://observatório.org" target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-primary/80 transition-colors">
          <Home size={24} className="mr-2" />
          <span className="font-medium hidden md:inline">Observatório</span>
        </a>
      </div>
      
      <div className="text-center flex-1 flex justify-center">
        <p className="text-lg text-muted-foreground mt-2 ml-4">
          Monitoramento e Análise de Indicadores Regionais
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <Link to="/help">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <HelpCircle size={16} />
              <span className="hidden md:inline">Ajuda</span>
            </Button>
          </Link>
        )}
        
        {isAuthenticated ? (
          <Button variant="outline" onClick={onLogoutClick} className="flex items-center gap-2">
            <UserRound size={18} />
            <span className="hidden md:inline">Administrador</span>
            <LogOut size={18} />
          </Button>
        ) : (
          <Button variant="outline" onClick={onLoginClick} className="flex items-center gap-2">
            <LogIn size={18} />
            <span className="hidden md:inline">Entrar</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
