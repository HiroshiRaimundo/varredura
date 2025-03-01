
export type ClientType = "observatory" | "researcher" | "politician" | "institution" | "journalist" | "press";

export interface ClientTypeInfo {
  type: ClientType;
  label: string;
  description: string;
  icon: string;
  color: string;
  alert?: string;
}

export const clientTypes: ClientTypeInfo[] = [
  {
    type: "observatory",
    label: "Observatório",
    description: "Acesso a dados e visualizações para observatórios de políticas públicas",
    icon: "database",
    color: "bg-blue-500"
  },
  {
    type: "researcher",
    label: "Pesquisador",
    description: "Recursos para pesquisadores acadêmicos e científicos",
    icon: "microscope",
    color: "bg-purple-500"
  },
  {
    type: "politician",
    label: "Político",
    description: "Ferramentas para acompanhamento de políticas e legislação",
    icon: "landmark",
    color: "bg-green-500"
  },
  {
    type: "institution",
    label: "Instituição",
    description: "Recursos para instituições governamentais e não-governamentais",
    icon: "building",
    color: "bg-amber-500"
  },
  {
    type: "journalist",
    label: "Jornalista",
    description: "Fontes de dados e indicadores para reportagens",
    icon: "newspaper",
    color: "bg-rose-500"
  },
  {
    type: "press",
    label: "Assessoria de Imprensa",
    description: "Ferramentas para criação e distribuição de releases",
    icon: "megaphone",
    color: "bg-indigo-500",
    alert: "Novo"
  }
];

export const getClientTypeInfo = (type: ClientType): ClientTypeInfo => {
  const info = clientTypes.find(ct => ct.type === type);
  if (!info) {
    throw new Error(`Client type "${type}" not found`);
  }
  return info;
};
