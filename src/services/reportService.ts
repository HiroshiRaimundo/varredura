import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ReportData {
  name: string;
  metrics: {
    id: string;
    name: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }[];
  analysisResults: {
    type: string;
    data: any;
    timestamp: string;
  }[];
}

export const generateReport = async (
  data: ReportData[],
  format: string,
  dateRange: { from: Date; to: Date }
) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return generatePDFReport(data, dateRange);
    case 'excel':
      return generateExcelReport(data, dateRange);
    case 'csv':
      return generateCSVReport(data, dateRange);
    case 'json':
      return generateJSONReport(data, dateRange);
    default:
      throw new Error('Formato de relatório não suportado');
  }
};

const generatePDFReport = async (data: ReportData[], dateRange: { from: Date; to: Date }) => {
  const doc = new jsPDF();

  // Adiciona cabeçalho
  doc.setFontSize(16);
  doc.text('Relatório de Monitoramento', 14, 15);
  doc.setFontSize(10);
  doc.text(`Período: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`, 14, 25);

  // Para cada fonte monitorada
  let yPosition = 35;
  data.forEach((source) => {
    // Nome da fonte
    doc.setFontSize(12);
    doc.text(source.name, 14, yPosition);
    yPosition += 10;

    // Tabela de métricas
    const metricsData = source.metrics.map(metric => [
      metric.name,
      metric.value.toString(),
      metric.trend,
      `${metric.change}%`
    ]);

    (doc as any).autoTable({
      startY: yPosition,
      head: [['Métrica', 'Valor', 'Tendência', 'Variação']],
      body: metricsData,
      margin: { left: 14 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // Análises
    if (source.analysisResults.length > 0) {
      doc.setFontSize(11);
      doc.text('Análises:', 14, yPosition);
      yPosition += 7;

      source.analysisResults.forEach(analysis => {
        doc.setFontSize(10);
        doc.text(`${analysis.type}: ${formatAnalysisResult(analysis)}`, 20, yPosition);
        yPosition += 5;
      });

      yPosition += 10;
    }

    // Verifica se precisa de nova página
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 15;
    }
  });

  // Salva o PDF
  const blob = doc.output('blob');
  saveAs(blob, `relatorio-monitoramento-${dateRange.from.toISOString().split('T')[0]}.pdf`);
};

const generateExcelReport = async (data: ReportData[], dateRange: { from: Date; to: Date }) => {
  const workbook = XLSX.utils.book_new();

  // Cria uma planilha para cada fonte
  data.forEach((source) => {
    const metricsData = source.metrics.map(metric => ({
      'Métrica': metric.name,
      'Valor': metric.value,
      'Tendência': metric.trend,
      'Variação': `${metric.change}%`
    }));

    const analysisData = source.analysisResults.map(analysis => ({
      'Tipo': analysis.type,
      'Resultado': formatAnalysisResult(analysis),
      'Data': new Date(analysis.timestamp).toLocaleString()
    }));

    // Adiciona planilha de métricas
    const metricsWS = XLSX.utils.json_to_sheet(metricsData);
    XLSX.utils.book_append_sheet(workbook, metricsWS, `${source.name} - Métricas`);

    // Adiciona planilha de análises
    if (analysisData.length > 0) {
      const analysisWS = XLSX.utils.json_to_sheet(analysisData);
      XLSX.utils.book_append_sheet(workbook, analysisWS, `${source.name} - Análises`);
    }
  });

  // Gera o arquivo Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `relatorio-monitoramento-${dateRange.from.toISOString().split('T')[0]}.xlsx`);
};

const generateCSVReport = async (data: ReportData[], dateRange: { from: Date; to: Date }) => {
  let csvContent = 'Fonte,Tipo,Nome,Valor,Tendência,Variação,Data\n';

  data.forEach(source => {
    // Adiciona métricas
    source.metrics.forEach(metric => {
      csvContent += `${source.name},Métrica,${metric.name},${metric.value},${metric.trend},${metric.change}%,\n`;
    });

    // Adiciona análises
    source.analysisResults.forEach(analysis => {
      csvContent += `${source.name},Análise,${analysis.type},,,,${new Date(analysis.timestamp).toLocaleString()}\n`;
    });
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `relatorio-monitoramento-${dateRange.from.toISOString().split('T')[0]}.csv`);
};

const generateJSONReport = async (data: ReportData[], dateRange: { from: Date; to: Date }) => {
  const reportData = {
    period: {
      from: dateRange.from,
      to: dateRange.to
    },
    sources: data
  };

  const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
  saveAs(blob, `relatorio-monitoramento-${dateRange.from.toISOString().split('T')[0]}.json`);
};

const formatAnalysisResult = (analysis: { type: string; data: any }) => {
  // Formata o resultado da análise de acordo com o tipo
  switch (analysis.type) {
    case 'sentiment':
      return `Positivo: ${analysis.data.positive}%, Negativo: ${analysis.data.negative}%, Neutro: ${analysis.data.neutral}%`;
    case 'trends':
      return `Tendência: ${analysis.data.trend}, Confiança: ${analysis.data.confidence}%`;
    default:
      return JSON.stringify(analysis.data);
  }
};
