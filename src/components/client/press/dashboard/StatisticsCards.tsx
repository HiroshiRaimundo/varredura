
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, FileText, Eye, Clock } from 'lucide-react';

export interface StatisticsCardsProps {
  stats: {
    releases: number;
    published: number;
    views: number;
    pending: number;
  };
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  return (
    <>
      <Card>
        <CardContent className="flex items-center py-4">
          <div className="mr-4 bg-blue-100 p-2 rounded-full">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Releases</p>
            <h3 className="text-2xl font-bold">{stats.releases}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center py-4">
          <div className="mr-4 bg-green-100 p-2 rounded-full">
            <BarChart2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Publicados</p>
            <h3 className="text-2xl font-bold">{stats.published}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center py-4">
          <div className="mr-4 bg-purple-100 p-2 rounded-full">
            <Eye className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
            <h3 className="text-2xl font-bold">{stats.views}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center py-4">
          <div className="mr-4 bg-yellow-100 p-2 rounded-full">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
            <h3 className="text-2xl font-bold">{stats.pending}</h3>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StatisticsCards;
