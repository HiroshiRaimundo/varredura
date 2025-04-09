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
          {/* Public pages */}
          <Route path="/" element={<Index />} />

          {/* Login routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/simple-login" element={<SimpleLogin />} />
          
          {/* Service routes */}
          <Route path="/service/:serviceId" element={<ServiceLanding />} />
          <Route path="/client" element={<Client />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Example pages - demonstrating both private and public access */}
          <Route path="/example-dashboard" element={<ExampleDashboard />} />
          <Route path="/example-client" element={<ExampleClient />} />
          
          {/* Client area */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <ClientDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Authorization error */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin routes - all protected */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/clients"
            element={
              <PrivateRoute requiredRole="admin">
                <ClientManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/contacts"
            element={
              <PrivateRoute requiredRole="admin">
                <MediaContactsManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/releases"
            element={
              <PrivateRoute requiredRole="admin">
                <ReleasesManagement />
              </PrivateRoute>
            }
          />
          
          {/* Workspace management routes */}
          <Route
            path="/admin/workspace-settings"
            element={
              <PrivateRoute requiredRole="admin">
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/impersonate"
            element={
              <PrivateRoute requiredRole="admin">
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/reset-workspace"
            element={
              <PrivateRoute requiredRole="admin">
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/raw-data"
            element={
              <PrivateRoute requiredRole="admin">
                <WorkspaceManagement />
              </PrivateRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
