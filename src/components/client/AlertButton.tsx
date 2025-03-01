
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AlertButtonProps {
  unreadCount: number;
  onClick: () => void;
}

const AlertButton: React.FC<AlertButtonProps> = ({ unreadCount, onClick }) => {
  return (
    <div className="flex justify-end">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 relative"
        onClick={onClick}
      >
        <Bell className="h-4 w-4" />
        Alertas de Legislação
        {unreadCount > 0 && (
          <Badge variant="destructive" className="absolute -top-2 -right-2">
            {unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default AlertButton;
