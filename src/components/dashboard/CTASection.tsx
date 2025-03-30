
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-white px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Recursos da plataforma Varredura</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Ferramentas poderosas para gestão de comunicação e monitoramento inteligente em um único lugar
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Monitoramento de Fontes</h3>
            <p className="text-gray-600 mb-4">Acompanhamento automatizado de notícias, portais, diários oficiais e redes sociais relevantes para seu setor.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Gerenciamento de Pautas</h3>
            <p className="text-gray-600 mb-4">Organize, acompanhe e avalie o ciclo completo de suas pautas e comunicados, desde a criação até os resultados.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Banco de Dados de Mídia</h3>
            <p className="text-gray-600 mb-4">Mantenha um registro atualizado de contatos de jornalistas, veículos e influenciadores segmentados por área.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Análise de Dados</h3>
            <p className="text-gray-600 mb-4">Transforme dados brutos em insights acionáveis com gráficos, relatórios e análises personalizados.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Automação de Tarefas</h3>
            <p className="text-gray-600 mb-4">Automatize processos repetitivos como envio de releases, alertas de menções e relatórios periódicos.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Acompanhamento Geográfico</h3>
            <p className="text-gray-600 mb-4">Visualize estudos, reportagens e indicadores em mapas interativos para uma perspectiva geográfica dos dados.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg">
            <Link to="/login">
              Experimente a Plataforma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
