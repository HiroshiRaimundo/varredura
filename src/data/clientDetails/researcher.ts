
import { ClientTypeDetail } from "@/types/clientTypes";

export const researcherDetails: ClientTypeDetail = {
  id: "researcher",
  title: "Pesquisador",
  shortDescription: "Acesso a datasets completos e ferramentas estatísticas avançadas.",
  description: "Acesso a datasets completos, APIs para integração com ferramentas estatísticas, histórico de séries temporais e capacidade de compartilhamento de dados com outros pesquisadores.",
  details: "Desenvolvida especialmente para pesquisadores, nossa plataforma oferece acesso privilegiado a conjuntos de dados exclusivos e ferramentas estatísticas avançadas. Consulte séries históricas, exporte dados em formato compatível com softwares estatísticos e colabore com outros pesquisadores em um ambiente seguro.",
  features: [
    "Acesso a datasets exclusivos e atualizados",
    "Ferramentas de análise estatística integradas",
    "Exportação para R, Python, SPSS e outros formatos",
    "Colaboração segura entre pesquisadores",
    "Documentação completa das metodologias"
  ],
  benefits: [
    "Acesse dados confiáveis e atualizados para suas pesquisas",
    "Economize tempo com dados já estruturados e limpos",
    "Colabore facilmente com colegas em projetos compartilhados",
    "Obtenha suporte metodológico especializado",
    "Publique resultados com maior rapidez e qualidade"
  ],
  caseStudy: {
    title: "Grupo de Pesquisa em Políticas Públicas",
    description: "Um grupo de pesquisa universitário conseguiu publicar 3 artigos científicos em menos de um ano usando os datasets e ferramentas disponíveis na plataforma."
  }
};
