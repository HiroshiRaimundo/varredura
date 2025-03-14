import { ClientType } from './clientTypes';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
  createdAt: string;
  lastLogin: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  type: ClientType;
  status: 'active' | 'inactive' | 'trial' | 'suspended';
  plan: 'free' | 'basic' | 'premium';
  createdAt: string;
  trialEndsAt?: string;
  organization?: string;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'pix';
  createdAt: string;
  paidAt?: string;
  description: string;
}

export interface Subscription {
  id: string;
  clientId: string;
  plan: 'basic' | 'premium';
  status: 'active' | 'canceled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
}

export interface PasswordReset {
  id: string;
  clientId: string;
  email: string;
  status: 'pending' | 'completed' | 'expired';
  requestedAt: string;
  completedAt?: string;
  token: string;
  expiresAt: string;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  type: 'login' | 'logout' | 'password_change' | 'profile_update' | 'subscription_change';
  description: string;
  createdAt: string;
  ipAddress: string;
  userAgent: string;
}
