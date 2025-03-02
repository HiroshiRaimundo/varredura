
import React from "react";
import { MonitoringItem } from "./types";
import MonitoringCard from "./MonitoringCard";

interface MonitoringCardListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringCardList: React.FC<MonitoringCardListProps> = ({ items, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MonitoringCard 
          key={item.id} 
          item={item} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default MonitoringCardList;
