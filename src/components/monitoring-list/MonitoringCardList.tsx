
import React from "react";
import MonitoringCard from "./MonitoringCard";
import { MonitoringItem } from "./types";

interface MonitoringCardListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
}

const MonitoringCardList: React.FC<MonitoringCardListProps> = ({ items, onDelete }) => {
  console.log("MonitoringCardList received items:", items);
  
  // Check if items is undefined or not an array
  if (!items) {
    console.error("MonitoringCardList received undefined items");
    return (
      <div className="text-center p-4 text-gray-500 border rounded-md">
        Erro ao carregar itens de monitoramento. Por favor, recarregue a página.
      </div>
    );
  }
  
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <div className="grid gap-4 mt-4">
      {safeItems.length > 0 ? (
        safeItems.map((item) => (
          <MonitoringCard key={item.id} item={item} onDelete={onDelete} />
        ))
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-md text-gray-500 border">
          Nenhum item de monitoramento encontrado. Adicione um novo item usando o formulário acima.
        </div>
      )}
    </div>
  );
};

export default MonitoringCardList;
