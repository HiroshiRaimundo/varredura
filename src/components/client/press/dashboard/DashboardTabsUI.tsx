
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardTabsUI: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <TabsList className="grid grid-cols-3 mb-4">
      <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Visão Geral</TabsTrigger>
      <TabsTrigger value="activity" onClick={() => setActiveTab("activity")}>Atividades</TabsTrigger>
      <TabsTrigger value="publications" onClick={() => setActiveTab("publications")}>Publicações</TabsTrigger>
    </TabsList>
  );
};

export default DashboardTabsUI;
