
import React from "react";
import { Users, AlertCircle, BarChart2, Calendar } from "lucide-react";

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Uma plataforma, múltiplos benefícios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Assessores de Imprensa</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Gestão integrada de pautas e releases</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Automação da distribuição de conteúdo</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Métricas de efetividade das ações de imprensa</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Banco de dados de contatos de mídia atualizado</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-amber-50 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Políticos e Gestores Públicos</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Monitoramento da imagem pública e menções</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Acompanhamento de repercussão de ações e projetos</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Gestão de comunicação com eleitores e cidadãos</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Análise de tendências e pautas relevantes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-50 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Pesquisadores e Acadêmicos</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Monitoramento automático de fontes oficiais</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Acompanhamento de indicadores e estatísticas</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Ferramentas de análise de dados para pesquisas</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Exportação de dados em múltiplos formatos</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-50 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Instituições e Organizações</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Monitoramento da presença institucional na mídia</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Gestão centralizada de comunicação externa</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Relatórios de impacto e alcance de divulgações</span>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mt-1 mr-2">✓</div>
                <span>Integração com canais de comunicação existentes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
