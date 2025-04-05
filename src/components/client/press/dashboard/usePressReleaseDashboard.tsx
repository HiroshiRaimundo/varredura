
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { SocialMediaStat } from './SocialMediaCard';

export const usePressReleaseDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data de redes sociais
  const socialMediaStats: SocialMediaStat[] = [
    { 
      platform: 'Facebook', 
      mentions: 28, 
      engagement: 342, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Facebook className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    },
    { 
      platform: 'Twitter', 
      mentions: 47, 
      engagement: 215, 
      sentiment: 'neutral', 
      trend: 'stable',
      icon: <Twitter className="h-5 w-5" />,
      color: 'bg-sky-100 text-sky-800 hover:bg-sky-200'
    },
    { 
      platform: 'Instagram', 
      mentions: 19, 
      engagement: 508, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Instagram className="h-5 w-5" />,
      color: 'bg-pink-100 text-pink-800 hover:bg-pink-200'
    },
    { 
      platform: 'LinkedIn', 
      mentions: 12, 
      engagement: 137, 
      sentiment: 'positive', 
      trend: 'up',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    }
  ];

  const pressReleases = [
    {
      id: '1',
      title: 'Nova Parceria Estratégica',
      status: 'Publicado',
      publications: 8,
      reach: '75K+'
    },
    {
      id: '2',
      title: 'Lançamento do Produto X',
      status: 'Publicado',
      publications: 12,
      reach: '120K+'
    },
    {
      id: '3',
      title: 'Relatório Anual',
      status: 'Em processamento',
      publications: 3,
      reach: '30K+'
    },
    {
      id: '4',
      title: 'Evento Corporativo',
      status: 'Publicado',
      publications: 4,
      reach: '25K+'
    }
  ];

  const mediaOverviewStats = {
    pressStats: {
      releases: 32,
      publications: 27,
      reach: '250K+'
    },
    socialStats: {
      mentions: socialMediaStats.reduce((acc, curr) => acc + curr.mentions, 0),
      engagement: socialMediaStats.reduce((acc, curr) => acc + curr.engagement, 0),
      sentiment: 'Positivo (78%)'
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulação de atualização de dados
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return {
    activeTab,
    setActiveTab,
    isRefreshing,
    refreshData,
    socialMediaStats,
    pressReleases,
    mediaOverviewStats
  };
};
