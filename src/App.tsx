
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Help from "@/pages/Help";
import Client from "@/pages/Client";
import ClientLogin from "@/pages/ClientLogin";
import ServiceLanding from "@/pages/ServiceLanding";
import Payment from "@/pages/Payment";
import ExampleClient from "@/pages/ExampleClient";
import NotFound from "@/pages/NotFound";
import ObservatoryClient from "@/pages/clients/ObservatoryClient";
import ResearcherClient from "@/pages/clients/ResearcherClient";
import PoliticianClient from "@/pages/clients/PoliticianClient";
import InstitutionClient from "@/pages/clients/InstitutionClient";
import JournalistClient from "@/pages/clients/JournalistClient";
import PressClient from "@/pages/clients/PressClient";

function App() {
  console.log("App component rendered with routes");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/help" element={<Help />} />
        <Route path="/client/:clientType" element={<Client />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/service/:serviceId" element={<ServiceLanding />} />
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/example-client" element={<ExampleClient />} />
        
        {/* Novas páginas específicas por tipo de cliente */}
        <Route path="/admin/client/observatory" element={<ObservatoryClient />} />
        <Route path="/admin/client/researcher" element={<ResearcherClient />} />
        <Route path="/admin/client/politician" element={<PoliticianClient />} />
        <Route path="/admin/client/institution" element={<InstitutionClient />} />
        <Route path="/admin/client/journalist" element={<JournalistClient />} />
        <Route path="/admin/client/press" element={<PressClient />} />
        
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
