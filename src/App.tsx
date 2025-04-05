import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';

// Admin pages
import Admin from '@/pages/Admin';
import ClientManagement from '@/pages/admin/ClientManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import MediaContactsManagement from '@/pages/admin/MediaContactsManagement';

// Client pages
import ClientDashboard from '@/pages/ClientDashboard';

// Other pages
import Index from '@/pages/Index';
import LoginPage from '@/pages/Login';
import ServiceLanding from '@/pages/ServiceLanding';
import Client from '@/pages/Client';
import Payment from '@/pages/Payment';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página inicial pública */}
          <Route path="/" element={<Index />} />

          {/* Rotas de login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas de serviço */}
          <Route path="/service/:serviceId" element={<ServiceLanding />} />
          <Route path="/client" element={<Client />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Área do cliente (antiga example-client) */}
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
            path="/admin/content"
            element={
              <PrivateRoute>
                <ContentManagement />
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

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
