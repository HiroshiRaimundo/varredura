
import React, { useState, useEffect } from "react";
import { ClientType } from "@/components/client/ClientTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/monitoring-list/MonitoringList";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

// Define the MonitoringItem interface
interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  notes?: string;
}

interface MonitoringTabProps {
  clientType: ClientType;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ clientType }) => {
  const { toast } = useToast();
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responsibleFilter, setResponsibleFilter] = useState("");
  
  const form = useForm<MonitoringItem>({
    defaultValues: {
      name: "",
      url: "",
      api_url: "",
      frequency: "diario",
      category: "",
      keywords: "",
      responsible: "",
      institution: "",
      notes: ""
    }
  });

  // Mock data for demonstration
  const mockItems: MonitoringItem[] = [
    {
      id: "1",
      name: "Monitoramento de Leis Ambientais",
      url: "https://www.gov.br/ambiente/legislacao",
      frequency: "diario",
      category: "legislação",
      responsible: "Maria Silva",
      institution: "Ministério do Meio Ambiente",
      keywords: "meio ambiente, proteção, recursos naturais"
    },
    {
      id: "2",
      name: "Transparência Governamental",
      url: "https://transparencia.gov.br/",
      frequency: "semanal",
      category: "transparência",
      responsible: "João Pereira",
      institution: "CGU",
      keywords: "gastos públicos, licitações"
    }
  ];

  // Simulate fetch operation
  const fetchMonitoringItems = async () => {
    setIsLoading(true);
    try {
      // Here would be the Supabase query
      // const { data, error } = await supabase.from('monitoring_items').select('*');
      
      // Using mock data for now
      setTimeout(() => {
        setMonitoringItems(mockItems);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching monitoring items:", error);
      setIsLoading(false);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os monitoramentos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMonitoringItems();
  }, []);

  const handleAddMonitoring = async (data: Omit<MonitoringItem, "id">) => {
    try {
      // Here would be the Supabase insert
      /*
      const { data: newItem, error } = await supabase
        .from('monitoring_items')
        .insert({
          name: data.name,
          url: data.url,
          api_url: data.api_url || null,
          frequency: data.frequency,
          category: data.category,
          keywords: data.keywords || null,
          responsible: data.responsible || null,
          institution: data.institution || null,
          notes: data.notes || null
        })
        .select()
        .single();
      
      if (error) throw error;
      */
      
      // Mock response
      const newItem = {
        id: Date.now().toString(),
        ...data
      };
      
      setMonitoringItems([newItem, ...monitoringItems]);
      form.reset();
      
      toast({
        title: "Monitoramento adicionado",
        description: `O monitoramento "${data.name}" foi adicionado com sucesso.`
      });
    } catch (error) {
      console.error("Error adding monitoring:", error);
      toast({
        title: "Erro ao adicionar monitoramento",
        description: "Ocorreu um erro ao adicionar o monitoramento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMonitoring = async (id: string) => {
    try {
      // Here would be the Supabase delete
      /*
      const { error } = await supabase
        .from('monitoring_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      */
      
      setMonitoringItems(monitoringItems.filter(item => item.id !== id));
      
      toast({
        title: "Monitoramento excluído",
        description: "O monitoramento foi excluído com sucesso."
      });
    } catch (error) {
      console.error("Error deleting monitoring:", error);
      toast({
        title: "Erro ao excluir monitoramento",
        description: "Ocorreu um erro ao excluir o monitoramento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Get unique responsibles for filter
  const uniqueResponsibles = Array.from(
    new Set(monitoringItems.map(item => item.responsible).filter(Boolean))
  ) as string[];

  // Filter items based on responsible
  const filteredItems = responsibleFilter
    ? monitoringItems.filter(item => item.responsible === responsibleFilter)
    : monitoringItems;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monitoramento de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Configure novos monitoramentos de dados ou gerencie os existentes para seu painel personalizado.
          </p>
          
          <MonitoringForm 
            form={form} 
            onSubmit={handleAddMonitoring} 
            clientType={clientType} 
          />
        </CardContent>
      </Card>
      
      <MonitoringList 
        items={filteredItems}
        onDelete={handleDeleteMonitoring}
        isLoading={isLoading}
        uniqueResponsibles={uniqueResponsibles}
        responsibleFilter={responsibleFilter}
        onFilterChange={setResponsibleFilter}
      />
    </div>
  );
};

export default MonitoringTab;
