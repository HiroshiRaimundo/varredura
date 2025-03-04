
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, AtSign, Edit, Trash2 } from "lucide-react";
import { Contact, JournalistContact } from "../types/contactTypes";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string, type: "journalist" | "company") => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg">{contact.name}</h3>
          {contact.type === "journalist" && (
            <p className="text-sm">
              {(contact as JournalistContact).position} - {(contact as JournalistContact).company}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {contact.email}
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {contact.phone}
            </div>
            {contact.socialMedia && (
              <div className="flex items-center">
                <AtSign className="h-4 w-4 mr-1" />
                {contact.socialMedia}
              </div>
            )}
          </div>
          {contact.notes && (
            <p className="mt-2 text-sm italic">{contact.notes}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEdit(contact)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(contact.id, contact.type)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
