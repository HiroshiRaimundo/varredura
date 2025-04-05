
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ReleaseForm from "./ReleaseForm";
import ReleasesList from "./ReleasesList";

const ReleaseTab: React.FC = () => {
  const [showNewReleaseForm, setShowNewReleaseForm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Releases</CardTitle>
            <CardDescription>
              Crie, acompanhe e gerencie seus releases de imprensa
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowNewReleaseForm(true)} 
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Novo Release</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showNewReleaseForm ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowNewReleaseForm(false)} 
              className="mb-4"
            >
              Voltar para a lista
            </Button>
            <ReleaseForm onSubmitSuccess={() => setShowNewReleaseForm(false)} />
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="rejected">Reprovados</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ReleasesList filter="all" />
            </TabsContent>
            <TabsContent value="pending">
              <ReleasesList filter="pending" />
            </TabsContent>
            <TabsContent value="approved">
              <ReleasesList filter="approved" />
            </TabsContent>
            <TabsContent value="rejected">
              <ReleasesList filter="rejected" />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseTab;
