
export interface ClientLoginFormValues {
  email: string;
  password: string;
  clientType: string;
}

export interface ClientInfo {
  email: string;
  clientType: string;
  name: string;
  isLoggedIn: boolean;
  loginTime: string;
}
