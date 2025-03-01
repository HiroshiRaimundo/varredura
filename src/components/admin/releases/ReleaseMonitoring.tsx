import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import type { ReleaseMonitoring, ReleaseMonitoringResult } from '../types/releaseTypes';
import { checkReleasePublications } from '../utils/releaseUtils';

interface ReleaseMonitoringProps {
  monitoring: ReleaseMonitoring;
  onUpdate: (updatedMonitoring: ReleaseMonitoring) => void;
}

const ReleaseMonitoringComponent: React.FC<ReleaseMonitoringProps> = ({ monitoring, onUpdate }) => {
  const [results, setResults] = useState<ReleaseMonitoringResult[]>(monitoring.results);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setResults(monitoring.results);
  }, [monitoring.results]);

  const handleCheckPublications = async () => {
    setIsLoading(true);
    try {
      const newResults = await checkReleasePublications(monitoring);
      setResults([...results, ...newResults]);

      // Update the monitoring item with the new results
      const updatedMonitoring: ReleaseMonitoring = {
        ...monitoring,
        results: [...results, ...newResults]
      };
      onUpdate(updatedMonitoring);
    } catch (error) {
      console.error("Failed to check publications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyResult = (resultId: string) => {
    const updatedResults = results.map(result =>
      result.id === resultId ? { ...result, verified: true } : result
    );
    setResults(updatedResults);

    // Update the monitoring item with the verified result
    const updatedMonitoring: ReleaseMonitoring = {
      ...monitoring,
      results: updatedResults
    };
    onUpdate(updatedMonitoring);
  };

  const handleRejectResult = (resultId: string) => {
    const updatedResults = results.map(result =>
      result.id === resultId ? { ...result, verified: false } : result
    );
    setResults(updatedResults);

    // Update the monitoring item with the rejected result
    const updatedMonitoring: ReleaseMonitoring = {
      ...monitoring,
      results: updatedResults
    };
    onUpdate(updatedMonitoring);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoramento de Release: {monitoring.releaseTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>Websites Alvo: {monitoring.targetWebsites.join(', ')}</p>
          <p>Frequência: {monitoring.monitoringFrequency}</p>
          <p>Última Verificação: {monitoring.lastChecked}</p>
          <Button onClick={handleCheckPublications} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Verificar Publicações
              </>
            )}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>URL Encontrada</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Trecho</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell>{result.websiteName}</TableCell>
                <TableCell>
                  <a href={result.foundUrl} target="_blank" rel="noopener noreferrer">
                    {result.foundUrl}
                  </a>
                </TableCell>
                <TableCell>{result.foundDate} {result.foundTime}</TableCell>
                <TableCell>{result.excerptFound}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVerifyResult(result.id)}
                    disabled={result.verified === true}
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Verificar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRejectResult(result.id)}
                    disabled={result.verified === false}
                  >
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Rejeitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReleaseMonitoringComponent;
