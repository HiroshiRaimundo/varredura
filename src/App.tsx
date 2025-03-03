import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  console.log("App component rendered with routes");
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="/client/:clientType" element={<Client />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/service/:serviceId" element={<ServiceLanding />} />
          <Route path="/payment" element={<Payment />} /> 
          <Route path="/example-client" element={<ExampleClient />} />
          
          {/* Rotas protegidas - área administrativa */}
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/admin/client/observatory" element={<PrivateRoute><ObservatoryClient /></PrivateRoute>} />
          <Route path="/admin/client/researcher" element={<PrivateRoute><ResearcherClient /></PrivateRoute>} />
          <Route path="/admin/client/politician" element={<PrivateRoute><PoliticianClient /></PrivateRoute>} />
          <Route path="/admin/client/institution" element={<PrivateRoute><InstitutionClient /></PrivateRoute>} />
          <Route path="/admin/client/journalist" element={<PrivateRoute><JournalistClient /></PrivateRoute>} />
          <Route path="/admin/client/press" element={<PrivateRoute><PressClient /></PrivateRoute>} />
          
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
