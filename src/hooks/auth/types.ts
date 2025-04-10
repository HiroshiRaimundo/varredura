
import { UseFormReturn } from "react-hook-form";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  workspaceId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  isLoginDialogOpen: boolean;
  isLoggingIn: boolean;
  isImpersonating: boolean;
}

export interface AuthContextType extends AuthState {
  setIsLoginDialogOpen: (value: boolean) => void;
  form: UseFormReturn<LoginCredentials>;
  handleLogin: (data: LoginCredentials) => Promise<boolean>;
  handleLogout: () => void;
  navigate: (to: string, options?: any) => void;
  impersonateClient: (clientId: string) => Promise<void>;
  exitImpersonation: () => void;
  loginWithUser: (user: User) => Promise<boolean>;
}
