
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';

interface DashboardMetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  value,
  icon,
  badge
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-2xl font-bold">{value}</span>
          </div>
          {badge && (
            <Badge 
              variant={badge.variant || "outline"} 
              className={badge.className}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricCard;
