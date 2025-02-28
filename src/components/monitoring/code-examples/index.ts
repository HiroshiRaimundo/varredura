
import { transparenciaSpiderCode } from './TransparenciaSpider';
import { diarioOficialSpiderCode } from './DiarioOficialSpider';
import { ibgeSpiderCode } from './IbgeSpider';
import { apiExampleCode } from './ApiExample';

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  path: string;
}

export const spiderExamples: Record<string, CodeExample> = {
  transparencia: {
    title: "Portal de Transparência",
    description: "Spider para coleta de dados de despesas públicas do Portal da Transparência",
    code: transparenciaSpiderCode,
    path: "observatorio/spiders/governo/transparencia.py"
  },
  diario: {
    title: "Diário Oficial",
    description: "Spider para monitoramento de publicações no Diário Oficial da União",
    code: diarioOficialSpiderCode,
    path: "observatorio/spiders/governo/diario_oficial.py"
  },
  ibge: {
    title: "IBGE API",
    description: "Spider para coleta de indicadores socioeconômicos via API do IBGE",
    code: ibgeSpiderCode,
    path: "observatorio/spiders/indicadores/ibge.py"
  },
  api: {
    title: "Monitoramento via API",
    description: "Exemplo de código para monitoramento via endpoints de API",
    code: apiExampleCode,
    path: "observatorio/api/monitoring.js"
  }
};
