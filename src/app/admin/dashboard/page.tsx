'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se existe o token no cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <h1>Painel Administrativo</h1>
      {/* Conteúdo do dashboard */}
    </div>
  );
} 