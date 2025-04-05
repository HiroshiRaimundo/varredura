
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SearchBar from './SearchBar';
import ReleaseTable from './ReleaseTable';
import AlertsSection from './AlertsSection';
import ChartsSection from './ChartsSection';

interface SimpleReleaseData {
  id: string;
  title: string;
  status: string;
  date: string;
  views: number;
  published: boolean;
  publications: number;
}

interface AlertData {
  id: string;
  title: string;
  message: string;
  type: string;
}

interface DashboardOverviewProps {
  releases: SimpleReleaseData[];
  alerts: AlertData[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  releases,
  alerts,
  searchTerm,
  setSearchTerm
}) => {
  const filteredReleases = releases.filter(
    release => release.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Releases Recentes
              </CardTitle>
              <button className="px-2 py-1 text-sm border rounded hover:bg-slate-50">Ver todos</button>
            </div>
            <CardDescription>
              Seus últimos releases e status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ReleaseTable releases={filteredReleases} />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <AlertsSection alerts={alerts} />
        
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartsSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
