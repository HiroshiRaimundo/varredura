import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-border max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="flex items-center">
            Sustentabilidade
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          Desenvolvido por: Hiroshi Koga
        </div>
      </div>
    </footer>
  );
};

export default Footer;
