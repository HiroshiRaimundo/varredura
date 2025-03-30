
import React from "react";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ClientTabsProps {
  activeTab: "dashboard" | "monitoring" | "analysis" | "releases";
  setActiveTab: (tab: "dashboard" | "monitoring" | "analysis" | "releases") => void;
  clientType: ClientType;
}

const ClientTabs: React.FC<ClientTabsProps> = ({ activeTab, setActiveTab, clientType }) => {
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="flex space-x-1 p-1 bg-muted/30 rounded-lg mb-4">
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          activeTab === "dashboard"
            ? `bg-white shadow-sm ${colorClasses.text}`
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab("monitoring")}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          activeTab === "monitoring"
            ? `bg-white shadow-sm ${colorClasses.text}`
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        Monitoramento
      </button>
      <button
        onClick={() => setActiveTab("analysis")}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          activeTab === "analysis"
            ? `bg-white shadow-sm ${colorClasses.text}`
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        Análise
      </button>
      {clientType === "press" && (
        <button
          onClick={() => setActiveTab("releases")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "releases"
              ? `bg-white shadow-sm ${colorClasses.text}`
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Releases
        </button>
      )}
    </div>
  );
};

export default ClientTabs;
