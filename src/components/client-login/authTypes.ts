
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegistrationFormValues extends LoginFormValues {
  name?: string;
  phone?: string;
}
