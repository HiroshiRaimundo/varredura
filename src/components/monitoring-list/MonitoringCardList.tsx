
import React from "react";
import MonitoringCard from "./MonitoringCard";
import { MonitoringItem } from "./types";

interface MonitoringCardListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringCardList: React.FC<MonitoringCardListProps> = ({ items, onDelete }) => {
  console.log("MonitoringCardList received items:", items);
  
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <div className="grid gap-4">
      {safeItems.length > 0 ? (
        safeItems.map((item) => (
          <MonitoringCard key={item.id} item={item} onDelete={onDelete} />
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">
          Nenhum item de monitoramento encontrado.
        </div>
      )}
    </div>
  );
};

export default MonitoringCardList;
