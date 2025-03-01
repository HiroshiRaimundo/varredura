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
import NotFound from "@/pages/NotFound";

function App() {
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
