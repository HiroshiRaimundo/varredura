
import React from "react";
import { Search, BarChart2, FileText } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 mx-2 md:mx-8 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Uma solução integrada para todos os nichos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="text-center p-4">
              <div className="bg-purple-50 inline-flex p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Monitore</h3>
              <p className="text-gray-600">Acompanhamento em tempo real de notícias, mídias sociais e indicadores relevantes para sua área de atuação.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-50 inline-flex p-4 rounded-full mb-4">
                <BarChart2 className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Analise</h3>
              <p className="text-gray-600">Transforme dados em insights valiosos com análises avançadas e relatórios personalizados.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-50 inline-flex p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Gerencie</h3>
              <p className="text-gray-600">Centralize e automatize todas as rotinas de comunicação em um único lugar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
