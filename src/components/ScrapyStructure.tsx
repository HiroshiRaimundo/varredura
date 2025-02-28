
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Folder, FolderClosed, Code, Database, FileCode } from "lucide-react";

const ScrapyStructure: React.FC = () => {
  const renderIndent = (level: number) => {
    return Array(level).fill(0).map((_, i) => (
      <span key={i} className="w-5 inline-block" />
    ));
  };

  const renderFileOrFolder = (
    name: string, 
    icon: React.ReactNode, 
    level: number, 
    description?: string
  ) => {
    return (
      <div className="flex items-start py-1 text-sm">
        {renderIndent(level)}
        <div className="mr-2 text-primary">{icon}</div>
        <div className="flex-1">
          <span className="font-mono">{name}</span>
          {description && (
            <span className="text-muted-foreground ml-3 italic text-xs"># {description}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estrutura do Projeto Scrapy para Monitoramento</CardTitle>
      </CardHeader>
      <CardContent className="p-4 font-mono">
        <div className="bg-muted p-4 rounded-md overflow-auto max-h-[600px]">
          {renderFileOrFolder("observatorio_regional/", <FolderClosed size={18} />, 0)}
          
          {renderFileOrFolder("scrapy.cfg", <FileText size={18} />, 1, "Arquivo de configuração do Scrapy")}
          {renderFileOrFolder("requirements.txt", <FileText size={18} />, 1, "Dependências do projeto")}
          
          {renderFileOrFolder("observatorio/", <Folder size={18} />, 1, "Pacote principal do projeto")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 2)}
          
          {renderFileOrFolder("items.py", <FileCode size={18} />, 2, "Definição dos itens de dados a serem coletados")}
          {renderFileOrFolder("middlewares.py", <FileCode size={18} />, 2, "Middlewares personalizados")}
          {renderFileOrFolder("pipelines.py", <FileCode size={18} />, 2, "Pipelines para processamento e armazenamento de dados")}
          {renderFileOrFolder("settings.py", <FileCode size={18} />, 2, "Configurações do projeto")}
          
          {renderFileOrFolder("spiders/", <Folder size={18} />, 2, "Pasta com os spiders por categoria")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 3)}
          
          {renderFileOrFolder("governo/", <Folder size={18} />, 3, "Spiders para sites governamentais")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 4)}
          {renderFileOrFolder("transparencia.py", <Code size={18} />, 4, "Spider para portal de transparência")}
          {renderFileOrFolder("diario_oficial.py", <Code size={18} />, 4, "Spider para diários oficiais")}
          {renderFileOrFolder("licitacoes.py", <Code size={18} />, 4, "Spider para licitações públicas")}
          
          {renderFileOrFolder("indicadores/", <Folder size={18} />, 3, "Spiders para indicadores socioeconômicos")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 4)}
          {renderFileOrFolder("ibge.py", <Code size={18} />, 4, "Spider para dados do IBGE")}
          {renderFileOrFolder("ipea.py", <Code size={18} />, 4, "Spider para dados do IPEA")}
          {renderFileOrFolder("pnad.py", <Code size={18} />, 4, "Spider para PNAD")}
          
          {renderFileOrFolder("legislacao/", <Folder size={18} />, 3, "Spiders para monitoramento legislativo")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 4)}
          {renderFileOrFolder("leis_municipais.py", <Code size={18} />, 4, "Spider para leis municipais")}
          {renderFileOrFolder("legislacao_federal.py", <Code size={18} />, 4, "Spider para legislação federal")}
          
          {renderFileOrFolder("utils/", <Folder size={18} />, 2, "Utilitários e funções auxiliares")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 3)}
          {renderFileOrFolder("parsers.py", <FileCode size={18} />, 3, "Funções de parsing personalizadas")}
          {renderFileOrFolder("exporters.py", <FileCode size={18} />, 3, "Exportadores personalizados")}
          {renderFileOrFolder("validators.py", <FileCode size={18} />, 3, "Funções de validação de dados")}
          
          {renderFileOrFolder("databases/", <Folder size={18} />, 2, "Módulos para armazenamento de dados")}
          {renderFileOrFolder("__init__.py", <FileCode size={18} />, 3)}
          {renderFileOrFolder("mongodb.py", <Database size={18} />, 3, "Conexão com MongoDB")}
          {renderFileOrFolder("postgresql.py", <Database size={18} />, 3, "Conexão com PostgreSQL")}
          
          {renderFileOrFolder("scripts/", <Folder size={18} />, 1, "Scripts utilitários")}
          {renderFileOrFolder("run_all_spiders.py", <FileCode size={18} />, 2, "Script para executar todos os spiders")}
          {renderFileOrFolder("schedule_crawls.py", <FileCode size={18} />, 2, "Script para agendar coletas periódicas")}
          {renderFileOrFolder("generate_reports.py", <FileCode size={18} />, 2, "Script para gerar relatórios a partir dos dados coletados")}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapyStructure;
