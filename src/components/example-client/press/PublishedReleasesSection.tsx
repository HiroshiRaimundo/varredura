
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";
import { CheckCircle, ExternalLink, Calendar, Globe } from "lucide-react";

interface PublishedReleaseProps {
  clientType: ClientType;
  mockData: any;
}

const PublishedReleasesSection: React.FC<PublishedReleaseProps> = ({ clientType, mockData }) => {
  const colorClasses = getColorClasses(clientType);
  
  // Simulação de releases publicados com links (clipping)
  const publishedReleases = [
    {
      id: "1",
      title: "Lançamento da nova pesquisa sobre saúde pública",
      date: "2024-05-12",
      publishDate: "2024-05-15",
      outlets: [
        { name: "G1", url: "https://g1.globo.com/saude/noticia/2024/05/15/nova-pesquisa-saude.html" },
        { name: "Folha de São Paulo", url: "https://www1.folha.uol.com.br/saude/2024/05/15/pesquisa-revela-dados.html" }
      ],
      status: "published"
    },
    {
      id: "3",
      title: "Relatório de impacto social 2024",
      date: "2024-05-08",
      publishDate: "2024-05-11",
      outlets: [
        { name: "UOL", url: "https://noticias.uol.com.br/impacto-social/2024/05/relatorio-anual.htm" }
      ],
      status: "published"
    },
    {
      id: "4",
      title: "Iniciativa de sustentabilidade recebe prêmio internacional",
      date: "2024-04-22",
      publishDate: "2024-04-25",
      outlets: [
        { name: "CNN Brasil", url: "https://www.cnnbrasil.com.br/business/2024/04/25/iniciativa-sustentabilidade-premio.html" },
        { name: "Exame", url: "https://exame.com/esg/2024/04/25/premio-sustentabilidade.html" },
        { name: "Valor Econômico", url: "https://valor.globo.com/sustentabilidade/noticia/2024/04/25/premio-internacional.ghtml" }
      ],
      status: "published"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`text-lg ${colorClasses.text}`}>Clipping - Releases Publicados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {publishedReleases.map((release) => (
            <div key={release.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg mb-1">{release.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Enviado: {release.date}</span>
                    <span className="mx-2">•</span>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Publicado: {release.publishDate}</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Publicado
                </span>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  Publicações ({release.outlets.length}):
                </p>
                <ul className="space-y-2">
                  {release.outlets.map((outlet, idx) => (
                    <li key={idx} className="bg-gray-50 rounded-md p-2 flex justify-between items-center">
                      <span className="font-medium">{outlet.name}</span>
                      <a 
                        href={outlet.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-sm flex items-center ${colorClasses.text} hover:underline`}
                      >
                        Acessar publicação
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishedReleasesSection;
