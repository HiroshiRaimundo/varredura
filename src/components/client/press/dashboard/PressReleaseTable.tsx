
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PressReleaseTableProps {
  releases: Array<{
    id: string;
    title: string;
    status: string;
    publications: number;
    reach: string;
  }>;
}

const PressReleaseTable: React.FC<PressReleaseTableProps> = ({ releases }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoramento de Imprensa</CardTitle>
        <CardDescription className="text-muted-foreground">
          Acompanhe as publicações baseadas nos seus releases de imprensa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicações</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alcance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {releases.map((release) => (
                <tr key={release.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{release.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {release.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{release.publications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{release.reach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PressReleaseTable;
