
export interface Report {
  id: string;
  title: string;
  type: "pdf" | "excel";
  date: string;
  size: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}
