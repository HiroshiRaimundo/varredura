import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Admin pages
import Admin from '@/pages/Admin';
import ClientManagement from '@/pages/admin/ClientManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import MediaContactsManagement from '@/pages/admin/MediaContactsManagement';

// Dashboards
import ObservatoryDashboard from '@/pages/dashboard/ObservatoryDashboard';
import ResearcherDashboard from '@/pages/dashboard/ResearcherDashboard';
import PoliticianDashboard from '@/pages/dashboard/PoliticianDashboard';
import InstitutionDashboard from '@/pages/dashboard/InstitutionDashboard';
import JournalistDashboard from '@/pages/dashboard/JournalistDashboard';
import PressDashboard from '@/pages/dashboard/PressDashboard';

// Other pages
import LoginPage from '@/pages/Login';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública de login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rota de erro de autorização */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rotas administrativas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/client-management"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <ClientManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/content-management"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <ContentManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/media-contacts"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <MediaContactsManagement />
              </ProtectedRoute>
            }
          />

          {/* Rotas protegidas dos dashboards */}
          <Route
            path="/dashboard/observatory"
            element={
              <ProtectedRoute allowedTypes={['observatory']}>
                <ObservatoryDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/researcher"
            element={
              <ProtectedRoute allowedTypes={['researcher']}>
                <ResearcherDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/politician"
            element={
              <ProtectedRoute allowedTypes={['politician']}>
                <PoliticianDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/institution"
            element={
              <ProtectedRoute allowedTypes={['institution']}>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/journalist"
            element={
              <ProtectedRoute allowedTypes={['journalist']}>
                <JournalistDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/press"
            element={
              <ProtectedRoute allowedTypes={['press']}>
                <PressDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirecionar raiz para login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
