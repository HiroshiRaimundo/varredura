
import React from "react";
import { Button } from "@/components/ui/button";

interface LoginTabsProps {
  activeTab: 'email' | 'sso';
  setActiveTab: (tab: 'email' | 'sso') => void;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <Button 
        variant={activeTab === 'email' ? "default" : "outline"} 
        className="w-1/2"
        onClick={() => setActiveTab('email')}
      >
        Email e Senha
      </Button>
      <Button 
        variant={activeTab === 'sso' ? "default" : "outline"} 
        className="w-1/2"
        onClick={() => setActiveTab('sso')}
      >
        Login com SSO
      </Button>
    </div>
  );
};

export default LoginTabs;
