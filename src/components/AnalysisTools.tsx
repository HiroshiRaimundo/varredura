
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: string;
  category: string;
}

interface AnalysisToolsProps {
  items: MonitoringItem[];
}

const pandasScriptTemplate = (siteUrl: string, siteName: string) => `
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import requests
from bs4 import BeautifulSoup

# Configurações do site a ser monitorado
SITE_URL = "${siteUrl}"
SITE_NAME = "${siteName}"

# Função para coletar dados do site
def coletar_dados():
    try:
        response = requests.get(SITE_URL)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Aqui você deve personalizar a extração conforme a estrutura do site
        # Este é apenas um exemplo genérico
        dados = []
        tabelas = soup.find_all('table')
        
        for tabela in tabelas:
            for linha in tabela.find_all('tr'):
                colunas = linha.find_all('td')
                if colunas:
                    dados.append([col.text.strip() for col in colunas])
        
        # Criar DataFrame
        df = pd.DataFrame(dados)
        return df
    except Exception as e:
        print(f"Erro ao coletar dados de {SITE_NAME}: {str(e)}")
        return pd.DataFrame()

# Análise dos dados
def analisar_dados(df):
    if df.empty:
        print("Sem dados para analisar")
        return
    
    # Resumo estatístico
    print("Resumo estatístico:")
    print(df.describe())
    
    # Visualizações básicas
    try:
        plt.figure(figsize=(10, 6))
        df.iloc[:, 0].value_counts().plot(kind='bar')
        plt.title(f'Análise de {SITE_NAME}')
        plt.tight_layout()
        plt.savefig(f'{SITE_NAME.replace(" ", "_")}_analise.png')
    except Exception as e:
        print(f"Erro ao gerar visualização: {str(e)}")

# Execução principal
if __name__ == "__main__":
    print(f"Iniciando monitoramento de {SITE_NAME}")
    df = coletar_dados()
    if not df.empty:
        df.to_csv(f'{SITE_NAME.replace(" ", "_")}_dados.csv', index=False)
        print(f"Dados salvos em {SITE_NAME.replace(' ', '_')}_dados.csv")
        analisar_dados(df)
`;

const jupyterNotebookTemplate = (siteUrl: string, siteName: string) => `
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Análise de Dados: ${siteName}\\n",
    "Este notebook demonstra como analisar os dados coletados do site ${siteUrl}"
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
    "import requests\\n",
    "from bs4 import BeautifulSoup\\n",
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
    "# Configurações do site a ser monitorado\\n",
    "SITE_URL = \\"${siteUrl}\\"\\n",
    "SITE_NAME = \\"${siteName}\\"\\n",
    "\\n",
    "print(f\\"Analisando dados de {SITE_NAME}\\")\\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Função para coletar dados do site\\n",
    "def coletar_dados():\\n",
    "    try:\\n",
    "        response = requests.get(SITE_URL)\\n",
    "        response.raise_for_status()\\n",
    "        \\n",
    "        soup = BeautifulSoup(response.text, 'html.parser')\\n",
    "        \\n",
    "        # Personalizar a extração para este site específico\\n",
    "        # Este é apenas um exemplo genérico\\n",
    "        dados = []\\n",
    "        tabelas = soup.find_all('table')\\n",
    "        \\n",
    "        for tabela in tabelas:\\n",
    "            for linha in tabela.find_all('tr'):\\n",
    "                colunas = linha.find_all('td')\\n",
    "                if colunas:\\n",
    "                    dados.append([col.text.strip() for col in colunas])\\n",
    "        \\n",
    "        # Criar DataFrame\\n",
    "        df = pd.DataFrame(dados)\\n",
    "        return df\\n",
    "    except Exception as e:\\n",
    "        print(f\\"Erro ao coletar dados: {str(e)}\\")\\n",
    "        return pd.DataFrame()\\n",
    "\\n",
    "# Coletar dados\\n",
    "df = coletar_dados()\\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Análise Exploratória"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Análise estatística básica\\n",
    "df.describe()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Visualizações\\n",
    "plt.figure(figsize=(10, 6))\\n",
    "try:\\n",
    "    df.iloc[:, 0].value_counts().plot(kind='bar')\\n",
    "    plt.title(f'Análise de {SITE_NAME}')\\n",
    "    plt.tight_layout()\\n",
    "except:\\n",
    "    print(\\"Erro ao gerar visualização com os dados disponíveis\\")\\n",
    "plt.show()"
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

const powerBIScriptTemplate = (siteName: string) => `
# Power BI Script - Análise de ${siteName}

# 1. Importar os dados do site monitorado
let
    Source = Csv.Document(File.Contents("C:\\Dados\\${siteName.replace(/ /g, "_")}_dados.csv"),[Delimiter=",", Columns=25, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Cabeçalhos Promovidos" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Tipo Alterado" = Table.TransformColumnTypes(#"Cabeçalhos Promovidos",{{"Data", type date}})
in
    #"Tipo Alterado"

# 2. Criar medidas para análise
Total de Registros = COUNTROWS('${siteName.replace(/ /g, "_")}_dados')

Registros por Mês = 
CALCULATE(
    COUNTROWS('${siteName.replace(/ /g, "_")}_dados'),
    DATESBETWEEN('${siteName.replace(/ /g, "_")}_dados'[Data], STARTOFMONTH('${siteName.replace(/ /g, "_")}_dados'[Data]), ENDOFMONTH('${siteName.replace(/ /g, "_")}_dados'[Data]))
)
`;

const AnalysisTools: React.FC<AnalysisToolsProps> = ({ items }) => {
  const [activeTab, setActiveTab] = React.useState("pandas");
  
  const downloadScript = (item: MonitoringItem, type: string) => {
    let filename = '';
    let content = '';
    let fileType = '';
    
    switch (type) {
      case 'pandas':
        filename = `${item.name.replace(/ /g, "_")}_analysis.py`;
        content = pandasScriptTemplate(item.url, item.name);
        fileType = 'text/plain';
        break;
      case 'jupyter':
        filename = `${item.name.replace(/ /g, "_")}_notebook.ipynb`;
        content = jupyterNotebookTemplate(item.url, item.name);
        fileType = 'application/json';
        break;
      case 'powerbi':
        filename = `${item.name.replace(/ /g, "_")}_powerbi.pq`;
        content = powerBIScriptTemplate(item.name);
        fileType = 'text/plain';
        break;
      default:
        return;
    }
    
    const blob = new Blob([content], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Ferramentas de Análise</CardTitle>
        <CardDescription>
          Scripts personalizados para análise dos sites monitorados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pandas">Pandas/Python</TabsTrigger>
            <TabsTrigger value="jupyter">Jupyter Notebook</TabsTrigger>
            <TabsTrigger value="powerbi">Power BI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pandas" className="space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Adicione sites para monitoramento para gerar scripts de análise.
              </p>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Site Monitorado</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Frequência</th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Script Python</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.frequency}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1" 
                            onClick={() => downloadScript(item, 'pandas')}
                          >
                            <Download size={14} />
                            <span>Python</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="jupyter" className="space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Adicione sites para monitoramento para gerar notebooks Jupyter.
              </p>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Site Monitorado</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Frequência</th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Jupyter Notebook</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.frequency}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1" 
                            onClick={() => downloadScript(item, 'jupyter')}
                          >
                            <Download size={14} />
                            <span>Notebook</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="powerbi" className="space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Adicione sites para monitoramento para gerar scripts Power BI.
              </p>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Site Monitorado</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Frequência</th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Script Power BI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.frequency}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1" 
                            onClick={() => downloadScript(item, 'powerbi')}
                          >
                            <Download size={14} />
                            <span>Power BI</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisTools;
