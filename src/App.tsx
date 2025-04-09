import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/auth';
import PrivateRoute from '@/components/PrivateRoute';

// Admin pages
import Admin from '@/pages/Admin';
import ClientManagement from '@/pages/admin/ClientManagement';
import MediaContactsManagement from '@/pages/admin/MediaContactsManagement';
import ReleasesManagement from '@/pages/admin/ReleasesManagement';
import WorkspaceManagement from '@/pages/admin/WorkspaceManagement';

// Client pages
import ClientDashboard from '@/pages/ClientDashboard';
import ClientLogin from '@/pages/ClientLogin';
import ExampleDashboard from '@/pages/ExampleDashboard';
import ExampleClient from '@/pages/ExampleClient';
import SimpleLogin from '@/pages/SimpleLogin';

// Other pages
import Index from '@/pages/Index';
import LoginPage from '@/pages/Login';
import ServiceLanding from '@/pages/ServiceLanding';
import Client from '@/pages/Client';
import Payment from '@/pages/Payment';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Página inicial pública */}
          <Route path="/" element={<Index />} />

          {/* Rotas de login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/simple-login" element={<SimpleLogin />} />
          
          {/* Rotas de serviço */}
          <Route path="/service/:serviceId" element={<ServiceLanding />} />
          <Route path="/client" element={<Client />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Rotas de demonstração */}
          <Route 
            path="/example-dashboard" 
            element={
              <PrivateRoute>
                <ExampleDashboard />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/example-client" 
            element={
              <PrivateRoute>
                <ExampleClient />
              </PrivateRoute>
            } 
          />
          
          {/* Área do cliente */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <ClientDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Rota de erro de autorização */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rotas administrativas */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/clients"
            element={
              <PrivateRoute>
                <ClientManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/contacts"
            element={
              <PrivateRoute>
                <MediaContactsManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/releases"
            element={
              <PrivateRoute>
                <ReleasesManagement />
              </PrivateRoute>
            }
          />
          
          {/* Rotas de gerenciamento de workspace com propósitos diferentes */}
          <Route
            path="/admin/workspace-settings"
            element={
              <PrivateRoute>
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/impersonate"
            element={
              <PrivateRoute>
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/reset-workspace"
            element={
              <PrivateRoute>
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/raw-data"
            element={
              <PrivateRoute>
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
