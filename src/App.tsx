
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import Login from "./pages/Login";
import ClientLogin from "./pages/ClientLogin";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard (público) */}
          <Route path="/" element={<DashboardPage />} />
          
          {/* Área do cliente */}
          <Route path="/client" element={<Client />} />
          <Route path="/client/:clientType" element={<Client />} />
          <Route path="/client-login" element={<ClientLogin />} />
          
          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
          
          {/* Área administrativa */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Página de ajuda */}
          <Route path="/help" element={<Help />} />
          
          {/* Rota antiga - redirecionar para a nova estrutura */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
