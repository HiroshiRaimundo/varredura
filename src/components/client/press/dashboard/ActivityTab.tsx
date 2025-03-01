
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  title: string;
  date: string;
  status: string;
}

interface ActivityTabProps {
  activities: ActivityItem[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Histórico recente de ações e notificações</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b pb-4">
              <div className={`rounded-full p-2 ${
                activity.status === 'published' ? 'bg-green-100' : 
                activity.status === 'approved' ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                {activity.status === 'published' ? (
                  <ExternalLink className={`h-4 w-4 ${
                    activity.status === 'published' ? 'text-green-500' : 
                    activity.status === 'approved' ? 'text-blue-500' : 'text-yellow-500'
                  }`} />
                ) : activity.status === 'approved' ? (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
