
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Eye, RefreshCw, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  channel: 'POS' | 'SoftPOS' | 'Online';
  method: 'UPI' | 'Card' | 'Wallet';
  status: 'Completed' | 'Failed' | 'Refunded' | 'Pending';
}

const demoTransactions: Transaction[] = [
  {
    id: 'TXN-35423',
    date: '13 May, 2025 14:23',
    amount: '₹15,000.00',
    channel: 'Online',
    method: 'UPI',
    status: 'Completed',
  },
  {
    id: 'TXN-35422',
    date: '13 May, 2025 13:45',
    amount: '₹3,200.00',
    channel: 'SoftPOS',
    method: 'Card',
    status: 'Completed',
  },
  {
    id: 'TXN-35421',
    date: '13 May, 2025 12:32',
    amount: '₹7,500.00',
    channel: 'POS',
    method: 'Card',
    status: 'Completed',
  },
  {
    id: 'TXN-35420',
    date: '13 May, 2025 10:15',
    amount: '₹2,000.00',
    channel: 'Online',
    method: 'Wallet',
    status: 'Failed',
  },
  {
    id: 'TXN-35419',
    date: '12 May, 2025 18:22',
    amount: '₹5,450.00',
    channel: 'POS',
    method: 'Card',
    status: 'Refunded',
  },
];

export const TransactionTable = () => {
  const [transactions] = useState<Transaction[]>(demoTransactions);

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-medium">Recent Transactions</h3>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Transaction ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.channel}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        disabled={transaction.status === 'Refunded' || transaction.status === 'Failed'}
                      >
                        <RefreshCw className="h-4 w-4" /> Refund
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  let variant: "default" | "outline" | "secondary" | "destructive" = "default";
  
  switch (status) {
    case 'Completed':
      variant = "default";
      break;
    case 'Failed':
      variant = "destructive";
      break;
    case 'Refunded':
      variant = "secondary";
      break;
    case 'Pending':
      variant = "outline";
      break;
  }
  
  return <Badge variant={variant}>{status}</Badge>;
};
