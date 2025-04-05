
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface SocialMediaStat {
  platform: string;
  mentions: number;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface SocialMediaCardProps {
  platform: SocialMediaStat;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ platform }) => {
  const getSentimentBadge = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Positivo</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Neutro</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Negativo</Badge>;
      default:
        return null;
    }
  };

  const getTrendIndicator = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${platform.color} flex flex-row items-center justify-between py-4`}>
        <div className="flex items-center space-x-2">
          {platform.icon}
          <CardTitle className="text-md font-semibold">{platform.platform}</CardTitle>
        </div>
        {getSentimentBadge(platform.sentiment)}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Menções</p>
            <p className="text-xl font-bold flex items-center">
              {platform.mentions} {getTrendIndicator(platform.trend)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Engajamento</p>
            <p className="text-xl font-bold">{platform.engagement}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Principais hashtags:</p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline">#marca</Badge>
            <Badge variant="outline">#novidade</Badge>
            <Badge variant="outline">#lançamento</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaCard;
