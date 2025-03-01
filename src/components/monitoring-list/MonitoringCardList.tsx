
import React from "react";
import MonitoringCard from "./MonitoringCard";
import { MonitoringItem } from "./types";

interface MonitoringCardListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringCardList: React.FC<MonitoringCardListProps> = ({ items, onDelete }) => {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <MonitoringCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default MonitoringCardList;
