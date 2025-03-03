import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redireciona qualquer acesso direto a /admin para a página de login
  redirect('/admin/login');
} 