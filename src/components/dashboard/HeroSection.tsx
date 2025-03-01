
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <header className="py-8 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Serviços Especializados em Dados</h1>
        <p className="text-xl max-w-3xl">
          Oferecemos uma variedade de serviços especializados para diferentes públicos. Confira abaixo
          um resumo de cada serviço disponível.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;
