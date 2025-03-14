
export interface JournalistContact {
  id: string;
  name: string;
  type: "journalist";
  email: string;
  phone: string;
  socialMedia: string;
  company: string;
  position: string;
  notes: string;
}

export interface CompanyContact {
  id: string;
  name: string;
  type: "company";
  email: string;
  phone: string;
  socialMedia: string;
  notes: string;
}

export type Contact = JournalistContact | CompanyContact;

export interface ContactFormValues {
  name: string;
  type: "journalist" | "company";
  email: string;
  phone: string;
  socialMedia: string;
  company?: string;
  position?: string;
  notes: string;
}

export interface ContactsState {
  journalists: JournalistContact[];
  companies: CompanyContact[];
}
