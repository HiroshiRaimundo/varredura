
export interface PressReleaseData {
  id: string;
  title: string;
  mediaOutlet: string;
  publicationUrl: string;
  publicationDate: string;
  publicationTime: string;
  status: 'published' | 'pending' | 'scheduled' | 'approved' | 'rejected';
}

export const mockData: PressReleaseData[] = [
  {
    id: '1',
    title: 'Nova tecnologia ambiental lançada no mercado',
    mediaOutlet: 'Folha de São Paulo',
    publicationUrl: 'https://exemplo.com/noticia1',
    publicationDate: '10/06/2023',
    publicationTime: '14:30',
    status: 'published'
  },
  {
    id: '2',
    title: 'Resultados do estudo sobre qualidade do ar divulgados',
    mediaOutlet: 'G1',
    publicationUrl: 'https://exemplo.com/noticia2',
    publicationDate: '15/05/2023',
    publicationTime: '10:00',
    status: 'published'
  },
  {
    id: '3',
    title: 'Novo programa de monitoramento ambiental',
    mediaOutlet: 'Estadão',
    publicationUrl: '',
    publicationDate: '20/06/2023',
    publicationTime: '09:00',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Relatório anual de sustentabilidade',
    mediaOutlet: 'Valor Econômico',
    publicationUrl: '',
    publicationDate: '01/07/2023',
    publicationTime: '11:30',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Avanços na tecnologia de filtragem de água',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'approved'
  },
  {
    id: '6',
    title: 'Análise de impacto ambiental no setor industrial',
    mediaOutlet: '',
    publicationUrl: '',
    publicationDate: '',
    publicationTime: '',
    status: 'rejected'
  }
];
