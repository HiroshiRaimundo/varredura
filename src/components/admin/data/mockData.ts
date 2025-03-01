
import { JournalistContact, ReleaseData } from "../types/releaseTypes";

export const mockJournalists: JournalistContact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@folha.com.br',
    phone: '(11) 98765-4321',
    website: 'folha.com.br',
    socialMedia: '@mariasilva'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@g1.com',
    phone: '(21) 91234-5678',
    website: 'g1.com',
    socialMedia: '@joaosantos'
  }
];

export const mockReleases: ReleaseData[] = [
  {
    id: '1',
    title: 'Nova tecnologia ambiental lançada no mercado',
    clientName: 'Instituto Verde',
    clientType: 'observatory',
    mediaOutlet: 'Folha de São Paulo',
    publicationUrl: 'https://exemplo.com/noticia1',
    publicationDate: '10/06/2023',
    publicationTime: '14:30',
    status: 'published',
    content: 'Texto completo do release...',
    subtitle: 'Inovação em monitoramento ambiental',
    author: 'Dr. Carlos Mendes'
  },
  {
    id: '2',
    title: 'Resultados do estudo sobre qualidade do ar divulgados',
    clientName: 'Dr. Ana Silva',
    clientType: 'researcher',
    mediaOutlet: 'G1',
    publicationUrl: 'https://exemplo.com/noticia2',
    publicationDate: '15/05/2023',
    publicationTime: '10:00',
    status: 'published',
    content: 'Texto completo do release...',
    subtitle: 'Dados revelam melhoria na qualidade do ar',
    author: 'Dra. Ana Silva'
  },
  {
    id: '3',
    title: 'Novo programa de monitoramento ambiental',
    clientName: 'Prefeitura de São Paulo',
    clientType: 'politician',
    mediaOutlet: 'Estadão',
    publicationUrl: '',
    publicationDate: '20/06/2023',
    publicationTime: '09:00',
    status: 'scheduled',
    content: 'Texto completo do release...',
    subtitle: 'Prefeitura inicia nova fase de monitoramento',
    author: 'Secretaria do Meio Ambiente'
  },
  {
    id: '4',
    title: 'Relatório anual de sustentabilidade',
    clientName: 'Universidade Federal',
    clientType: 'institution',
    mediaOutlet: 'Valor Econômico',
    publicationUrl: '',
    publicationDate: '01/07/2023',
    publicationTime: '11:30',
    status: 'pending',
    content: 'Texto completo do release...',
    subtitle: 'Universidade divulga resultados anuais',
    author: 'Prof. Ricardo Almeida'
  },
  {
    id: '5',
    title: 'Entrevista exclusiva sobre políticas ambientais',
    clientName: 'Carlos Mendes',
    clientType: 'journalist',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'draft',
    content: 'Texto completo do release...',
    subtitle: 'Análise crítica das políticas atuais',
    author: 'Carlos Mendes'
  }
];
