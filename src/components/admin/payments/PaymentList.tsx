import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Payment } from '@/types/adminTypes';
import { Search, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PaymentListProps {
  payments: Payment[];
  onExportPayments: () => void;
}

const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  onExportPayments,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment =>
    payment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      case 'refunded':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar pagamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <button
          onClick={onExportPayments}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <Download className="w-4 h-4 mr-1" />
          Exportar
        </button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Data Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono">{payment.id}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{formatDate(payment.createdAt)}</TableCell>
                <TableCell>{payment.paidAt ? formatDate(payment.paidAt) : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentList;
