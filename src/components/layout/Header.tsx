
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, User } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();
  
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };
  
  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else if (auth.handleLogout) {
      auth.handleLogout();
    }
  };
  
  // Use auth context if props are not provided
  const isUserAuthenticated = isAuthenticated !== undefined ? isAuthenticated : auth.isAuthenticated;
  
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Varredura</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Início
          </Link>
          <Link to="/service/info" className="text-gray-700 hover:text-purple-600 font-medium">
            Recursos
          </Link>
          <Link to="/client" className="text-gray-700 hover:text-purple-600 font-medium">
            Demonstração
          </Link>
          <Link to="/service/contact" className="text-gray-700 hover:text-purple-600 font-medium">
            Contato
          </Link>
          
          {isUserAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link to="/admin">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button onClick={handleLogoutClick} variant="destructive">
                Sair
              </Button>
            </div>
          ) : (
            <Button onClick={handleLoginClick} className="bg-purple-600 hover:bg-purple-700">
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden p-4 bg-white border-t">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/service/info" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link 
              to="/client" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demonstração
            </Link>
            <Link 
              to="/service/contact" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
            
            {isUserAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Button asChild variant="outline">
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button onClick={() => {
                  handleLogoutClick();
                  setMobileMenuOpen(false);
                }} variant="destructive">
                  Sair
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  handleLoginClick();
                  setMobileMenuOpen(false);
                }} 
                className="bg-purple-600 hover:bg-purple-700 mt-2"
              >
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
