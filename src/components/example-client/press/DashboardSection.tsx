
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileText, Bell, Check, BarChart, PieChart } from "lucide-react";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface MockData {
  releaseStats: {
    published: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  monthlyData: number[];
  mediaOutlets: { name: string; count: number }[];
  recentReleases: {
    id: string;
    title: string;
    date: string;
    status: string;
  }[];
}

interface DashboardSectionProps {
  clientType: ClientType;
  mockData: MockData;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ clientType, mockData }) => {
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                <FileText className={`h-5 w-5 ${colorClasses.text}`} />
              </div>
              <div className="text-2xl font-bold">{mockData.releaseStats.published}</div>
              <p className="text-sm text-muted-foreground">Releases Publicados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                <Bell className={`h-5 w-5 ${colorClasses.text}`} />
              </div>
              <div className="text-2xl font-bold">{mockData.releaseStats.pending}</div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                <Check className={`h-5 w-5 ${colorClasses.text}`} />
              </div>
              <div className="text-2xl font-bold">{mockData.releaseStats.approved}</div>
              <p className="text-sm text-muted-foreground">Aprovados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`mx-auto w-10 h-10 ${colorClasses.light} rounded-full flex items-center justify-center mb-2`}>
                <BarChart className={`h-5 w-5 ${colorClasses.text}`} />
              </div>
              <div className="text-2xl font-bold">{mockData.mediaOutlets.length}</div>
              <p className="text-sm text-muted-foreground">Veículos Alcançados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Releases por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-around p-4">
                {mockData.monthlyData.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`${colorClasses.bg} rounded-t-sm w-6`}
                      style={{ height: `${value}px` }}
                    ></div>
                    <span className="text-xs mt-1">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="relative w-full h-full flex justify-center items-center">
                <div className="absolute text-center">
                  <PieChart className={`h-10 w-10 ${colorClasses.text} mx-auto`} />
                  <div className="mt-2 text-sm font-medium">Veículos</div>
                </div>
                {mockData.mediaOutlets.slice(0, 5).map((outlet, idx) => (
                  <div 
                    key={idx}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-sm"
                    style={{ 
                      transform: `rotate(${idx * 72}deg) translateY(-70px) rotate(-${idx * 72}deg)`,
                      opacity: 0.8
                    }}
                  >
                    <div className={`py-1 px-2 rounded-full ${colorClasses.light} ${colorClasses.text}`}>
                      {outlet.name}: {outlet.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Releases Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentReleases.map(release => (
              <div key={release.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">{release.title}</h4>
                  <p className="text-sm text-muted-foreground">{release.date}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    ${release.status === 'published' ? 'bg-green-100 text-green-800' : 
                    release.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                    {release.status === 'published' ? 'Publicado' : 
                      release.status === 'pending' ? 'Pendente' : 'Aprovado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-amber-50 border-amber-200">
        <AlertTitle className="text-amber-800">Dica de Assessoria</AlertTitle>
        <AlertDescription className="text-amber-700">
          Releases com títulos mais curtos têm 30% mais chances de serem publicados. 
          Tente manter seus títulos com menos de 60 caracteres.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DashboardSection;
