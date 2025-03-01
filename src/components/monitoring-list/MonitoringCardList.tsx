
import React from "react";
import MonitoringCard from "./MonitoringCard";
import { MonitoringItem } from "./types";

interface MonitoringCardListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringCardList: React.FC<MonitoringCardListProps> = ({ items, onDelete }) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <div className="grid gap-4">
      {safeItems.map((item) => (
        <MonitoringCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default MonitoringCardList;
