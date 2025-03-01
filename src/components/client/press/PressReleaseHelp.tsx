
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview, Guide, FAQ, BestPractices } from "./help";

const PressReleaseHelp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="guide">Passo a Passo</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
            <TabsTrigger value="best-practices">Melhores Práticas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="guide">
            <Guide />
          </TabsContent>

          <TabsContent value="faq">
            <FAQ />
          </TabsContent>

          <TabsContent value="best-practices">
            <BestPractices />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PressReleaseHelp;
