
import { ClientType } from "@/types/clientTypes";

export const clientTypes = [
  {
    type: "observatory" as ClientType,
    label: "Observatório",
    description: "Acesso a dashboards e ferramentas para observatórios de dados",
    alert: "Popular"
  },
  {
    type: "researcher" as ClientType,
    label: "Pesquisador",
    description: "Ferramentas para análise e processamento de dados científicos",
    alert: ""
  },
  {
    type: "politician" as ClientType,
    label: "Político",
    description: "Monitoramento de legislação e indicadores governamentais",
    alert: ""
  },
  {
    type: "institution" as ClientType,
    label: "Instituição",
    description: "Soluções para gestão de dados institucionais",
    alert: ""
  },
  {
    type: "journalist" as ClientType,
    label: "Jornalista",
    description: "Acesso a dados verificados para produção de conteúdo",
    alert: ""
  },
  {
    type: "press" as ClientType,
    label: "Assessoria de Imprensa",
    description: "Ferramentas para gestão de releases e contatos",
    alert: "Novo"
  },
];
