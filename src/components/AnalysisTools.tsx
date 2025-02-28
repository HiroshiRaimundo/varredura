
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const pandasScript = `
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Carregar dados do monitoramento
def analisar_dados_monitoramento(arquivo_json):
    # Carregar dados do JSON
    dados = pd.read_json(arquivo_json)
    
    # Análise básica
    print("Resumo estatístico:")
    print(dados.describe())
    
    # Agrupar por categoria
    por_categoria = dados.groupby('category').count()
    print("\\nContagem por categoria:")
    print(por_categoria)
    
    # Visualização - gráfico de barras por categoria
    plt.figure(figsize=(10, 6))
    por_categoria['name'].plot(kind='bar')
    plt.title('Quantidade de Monitoramentos por Categoria')
    plt.xlabel('Categoria')
    plt.ylabel('Quantidade')
    plt.savefig('monitoramentos_por_categoria.png')
    
    return dados

# Exemplo de uso
dados = analisar_dados_monitoramento('monitoramento-dados.json')
`;

const jupyterNotebook = `
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Análise de Dados do Observatório Regional\\n",
    "Este notebook demonstra como analisar os dados coletados pelo sistema de monitoramento."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\\n",
    "import numpy as np\\n",
    "import matplotlib.pyplot as plt\\n",
    "import seaborn as sns\\n",
    "\\n",
    "# Configuração visual\\n",
    "plt.style.use('ggplot')\\n",
    "sns.set(style='whitegrid')\\n",
    "%matplotlib inline"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Carregar dados exportados do sistema\\n",
    "dados_monitoramento = pd.read_json('monitoramento-dados.json')\\n",
    "\\n",
    "# Exibir primeiras linhas\\n",
    "dados_monitoramento.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Análise por Categoria"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Agrupar por categoria\\n",
    "por_categoria = dados_monitoramento.groupby('category').count()['name']\\n",
    "\\n",
    "# Visualizar distribuição por categoria\\n",
    "plt.figure(figsize=(10, 6))\\n",
    "por_categoria.plot(kind='pie', autopct='%1.1f%%')\\n",
    "plt.title('Distribuição de Monitoramentos por Categoria')\\n",
    "plt.ylabel('')  # Remove label do eixo y\\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Análise Temporal de Monitoramentos"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.10"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
`;

const powerBIScript = `
# Power BI Script - Conexão com os dados do Observatório

# 1. Importar os dados JSON
let
    Source = Json.Document(File.Contents("C:\\Dados\\monitoramento-dados.json")),
    #"Convertido para Tabela" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Colunas Expandidas" = Table.ExpandRecordColumn(#"Convertido para Tabela", "Column1", {"id", "name", "url", "frequency", "category"}, {"id", "name", "url", "frequency", "category"})
in
    #"Colunas Expandidas"

# 2. Criar medidas para análise
Contagem Total = COUNTROWS('monitoramento-dados')

Contagem por Categoria = 
CALCULATE(
    COUNTROWS('monitoramento-dados'),
    ALLEXCEPT('monitoramento-dados', 'monitoramento-dados'[category])
)

Frequência Mensal = 
CALCULATE(
    COUNTROWS('monitoramento-dados'),
    'monitoramento-dados'[frequency] = "mensal"
)
`;

const AnalysisTools: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Ferramentas de Análise</CardTitle>
        <CardDescription>
          Integrações com ferramentas analíticas para processamento dos dados coletados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pandas" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pandas">Pandas/Python</TabsTrigger>
            <TabsTrigger value="jupyter">Jupyter Notebook</TabsTrigger>
            <TabsTrigger value="powerbi">Power BI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pandas">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Análise com Pandas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Script Python utilizando Pandas para análise estatística e visualização dos dados coletados pelo sistema de monitoramento.
                </p>
                
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] font-mono text-sm">
                  {pandasScript.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Baixar Script Python
                </Button>
                <Button className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  Executar no Google Colab
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="jupyter">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Jupyter Notebook para Análise</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Notebook Jupyter para análise exploratória interativa dos dados coletados. Inclui visualizações e análises estatísticas.
                </p>
                
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] font-mono text-sm">
                  <pre>{jupyterNotebook}</pre>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Baixar Notebook
                </Button>
                <Button className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  Abrir no Jupyter
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="powerbi">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Integração com Power BI</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scripts para importação e análise dos dados no Power BI, permitindo a criação de dashboards interativos.
                </p>
                
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] font-mono text-sm">
                  {powerBIScript.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Baixar Template Power BI
                </Button>
                <Button className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  Tutorial de Integração
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisTools;
