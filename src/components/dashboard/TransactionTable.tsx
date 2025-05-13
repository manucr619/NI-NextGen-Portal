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
    <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 rounded-t-2xl">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Recent Transactions</h3>
        <Button variant="outline" size="sm" className="h-8 gap-1 rounded-lg shadow">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-white/40 dark:bg-gray-900/40">
            <TableRow>
              <TableHead className="w-[150px] text-gray-700 dark:text-gray-200">Transaction ID</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Date & Time</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Amount</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Channel</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Payment Method</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Status</TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
                <TableCell className="font-medium text-gray-900 dark:text-white">{transaction.id}</TableCell>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl shadow-lg">
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
