import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PasswordReset } from '@/types/adminTypes';
import { Search, RotateCw } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PasswordResetListProps {
  resets: PasswordReset[];
  onResetPassword: (resetId: string) => void;
}

const PasswordResetList: React.FC<PasswordResetListProps> = ({
  resets,
  onResetPassword,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResets = resets.filter(reset =>
    reset.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'expired':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Buscar por email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px]"
        />
        <Search className="w-4 h-4 text-gray-500" />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Solicitado em</TableHead>
              <TableHead>Expira em</TableHead>
              <TableHead>Completado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResets.map((reset) => (
              <TableRow key={reset.id}>
                <TableCell>{reset.email}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(reset.status)}>
                    {reset.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(reset.requestedAt)}</TableCell>
                <TableCell>{formatDate(reset.expiresAt)}</TableCell>
                <TableCell>
                  {reset.completedAt ? formatDate(reset.completedAt) : '-'}
                </TableCell>
                <TableCell>
                  {reset.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onResetPassword(reset.id)}
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Resetar Senha
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PasswordResetList;
