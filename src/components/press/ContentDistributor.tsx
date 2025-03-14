import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface Contact {
  id: string;
  name: string;
  organization: string;
  type: 'journalist' | 'website' | 'newspaper' | 'tv' | 'radio';
  email: string;
  phone?: string;
}

interface ContentDistributorProps {
  contentId: string;
  contentTitle: string;
  onDistribute: (contentId: string, selectedContacts: string[]) => void;
}

const ContentDistributor: React.FC<ContentDistributorProps> = ({
  contentId,
  contentTitle,
  onDistribute
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  // Mock data - substituir por dados reais da API
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'João Silva',
      organization: 'Folha de São Paulo',
      type: 'journalist',
      email: 'joao@folha.com.br'
    },
    {
      id: '2',
      name: 'G1',
      organization: 'Portal G1',
      type: 'website',
      email: 'pauta@g1.com'
    },
    {
      id: '3',
      name: 'Maria Santos',
      organization: 'O Globo',
      type: 'newspaper',
      email: 'maria@oglobo.com.br'
    }
  ];

  const contactTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'journalist', label: 'Jornalistas' },
    { value: 'website', label: 'Websites' },
    { value: 'newspaper', label: 'Jornais' },
    { value: 'tv', label: 'TV' },
    { value: 'radio', label: 'Rádio' }
  ];

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || contact.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleDistribute = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "Selecione contatos",
        description: "Por favor, selecione pelo menos um contato para distribuir o conteúdo.",
        variant: "destructive"
      });
      return;
    }

    onDistribute(contentId, selectedContacts);
    toast({
      title: "Conteúdo distribuído",
      description: `O conteúdo foi enviado para ${selectedContacts.length} contatos.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <select
            className="border rounded-md p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {contactTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="border rounded-md">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-md"
                >
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleToggleContact(contact.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.organization}</p>
                  </div>
                  <Badge>{contact.type}</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedContacts.length} contatos selecionados
          </p>
          <Button onClick={handleDistribute}>
            Distribuir Conteúdo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentDistributor;
