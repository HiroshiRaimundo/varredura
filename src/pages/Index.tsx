
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Users, FileText, Search, Calendar, AlertCircle, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="inline-block relative">
                Varredura
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500 rounded-full"></span>
              </span>
              <span className="block text-2xl md:text-3xl mt-4 text-gray-700">Gestão de Comunicação & Monitoramento Inteligente</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Plataforma integrada que automatiza rotinas de comunicação, monitora indicadores relevantes e transforma dados em insights valiosos para sua estratégia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg">
                <Link to={isAuthenticated ? "/admin" : "/login"}>
                  {isAuthenticated ? "Acessar Dashboard" : "Começar Agora"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-400 text-purple-600 hover:text-purple-700 px-6 py-6 text-lg">
                <Link to="/example-client">
                  <Eye className="mr-2 h-5 w-5" />
                  Ver Demonstração
                </Link>
              </Button>
            </div>
          </div>
          
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

      {/* Benefícios por nicho */}
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

      {/* Recursos da plataforma */}
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
              <Link to="/example-client">
                Ver Demonstração
                <Eye className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Varredura</h3>
              <p className="text-gray-400">
                Plataforma integrada de gestão de comunicação e monitoramento inteligente para diversos setores.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/example-client" className="text-gray-400 hover:text-white">Demonstração</Link></li>
                <li><Link to="/client" className="text-gray-400 hover:text-white">Área do Cliente</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">contato@varredura.com.br</p>
              <p className="text-gray-400">+55 (XX) XXXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Varredura. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
