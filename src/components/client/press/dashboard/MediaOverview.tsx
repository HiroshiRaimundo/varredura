
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MediaOverviewProps {
  pressStats: {
    releases: number;
    publications: number;
    reach: string;
  };
  socialStats: {
    mentions: number;
    engagement: number;
    sentiment: string;
  };
}

const MediaOverview: React.FC<MediaOverviewProps> = ({ pressStats, socialStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Imprensa</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Releases Enviados</span>
              <span className="font-medium">{pressStats.releases}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Publicações</span>
              <span className="font-medium">{pressStats.publications}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Alcance Estimado</span>
              <span className="font-medium">{pressStats.reach}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Total de Menções</span>
              <span className="font-medium">{socialStats.mentions}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Engajamento</span>
              <span className="font-medium">{socialStats.engagement}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Sentimento Geral</span>
              <span className="font-medium">{socialStats.sentiment}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaOverview;
