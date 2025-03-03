import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "@/pages/admin/login";
import Admin from "@/pages/Admin";
import AdminRoute from "@/components/auth/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de login administrativo */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Rotas protegidas do painel administrativo */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        
        {/* Redireciona a raiz para o login administrativo */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        
        {/* Redireciona rotas não encontradas para o login */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
