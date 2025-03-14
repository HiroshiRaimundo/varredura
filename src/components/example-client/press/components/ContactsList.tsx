
import React from "react";
import { JournalistContact, CompanyContact } from "../types/contactTypes";
import ContactCard from "./ContactCard";

interface ContactsListProps {
  contacts: JournalistContact[] | CompanyContact[];
  onEdit: (contact: JournalistContact | CompanyContact) => void;
  onDelete: (id: string, type: "journalist" | "company") => void;
  type: "journalists" | "companies";
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, onEdit, onDelete, type }) => {
  if (contacts.length === 0) {
    const message = type === "journalists" 
      ? "Nenhum jornalista cadastrado." 
      : "Nenhuma empresa cadastrada.";
      
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactsList;
