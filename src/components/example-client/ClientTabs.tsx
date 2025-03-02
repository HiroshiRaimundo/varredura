
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
    <div className="flex border-b border-border overflow-x-auto">
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`px-4 py-2 font-medium ${
          activeTab === "dashboard"
            ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
            : "text-muted-foreground"
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab("monitoring")}
        className={`px-4 py-2 font-medium ${
          activeTab === "monitoring"
            ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
            : "text-muted-foreground"
        }`}
      >
        Monitoramento
      </button>
      <button
        onClick={() => setActiveTab("analysis")}
        className={`px-4 py-2 font-medium ${
          activeTab === "analysis"
            ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
            : "text-muted-foreground"
        }`}
      >
        Análise
      </button>
      {clientType === "press" && (
        <button
          onClick={() => setActiveTab("releases")}
          className={`px-4 py-2 font-medium ${
            activeTab === "releases"
              ? `border-b-2 ${colorClasses.text} border-${colorClasses.text}`
              : "text-muted-foreground"
          }`}
        >
          Releases
        </button>
      )}
    </div>
  );
};

export default ClientTabs;
