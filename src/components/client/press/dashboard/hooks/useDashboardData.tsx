
import { useState, useEffect } from 'react';
import { ReleaseMonitoringItem } from '@/hooks/monitoring/types';
import { SimpleReleaseData, AlertData } from '../types/dashboardTypes';

export const useDashboardData = () => {
  const [publishedReleases, setPublishedReleases] = useState<ReleaseMonitoringItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for releases
  const releasesData: SimpleReleaseData[] = [
    {
      id: "1",
      title: "Nova política ambiental para a Amazônia",
      status: "aprovado",
      date: "2023-05-10",
      views: 245,
      published: true,
      publications: 3
    },
    {
      id: "2",
      title: "Relatório anual sobre desmatamento",
      status: "pendente",
      date: "2023-05-08",
      views: 120,
      published: false,
      publications: 0
    },
    {
      id: "3",
      title: "Iniciativa de reflorestamento em áreas degradadas",
      status: "em_revisao",
      date: "2023-05-05",
      views: 89,
      published: false,
      publications: 0
    },
  ];

  const publishedReleasesData: ReleaseMonitoringItem[] = [
    {
      id: "1",
      releaseId: "1",
      releaseTitle: "Nova política ambiental para a Amazônia",
      websiteName: "Portal Ambiental",
      publishedDate: "2023-04-15",
      publishedTime: "14:30",
      url: "https://example.com/release1",
      status: "publicado"
    },
    {
      id: "2",
      releaseId: "2",
      releaseTitle: "Relatório sobre desmatamento na região Norte",
      websiteName: "Jornal do Meio Ambiente",
      publishedDate: "2023-04-12",
      publishedTime: "09:45",
      url: "https://example.com/release2",
      status: "publicado"
    },
  ];

  const alertsData: AlertData[] = [
    {
      id: "1",
      title: "Pendência de aprovação",
      message: "3 releases aguardando aprovação",
      type: "warning"
    },
    {
      id: "2",
      title: "Publicação verificada",
      message: "Seu release foi publicado em 2 novos sites",
      type: "success"
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setPublishedReleases(publishedReleasesData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    releasesData,
    alertsData,
    publishedReleases,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab
  };
};
