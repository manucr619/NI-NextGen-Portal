import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Download } from 'lucide-react';

export const BillingCard = () => {
  return (
    <Card className="overflow-hidden border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center text-gray-800 dark:text-gray-100">
          <Receipt className="mr-2 h-5 w-5 text-primary" />
          Billing & Invoices
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Current Billing Period</span>
              <span className="font-medium">May 1 - May 31, 2025</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Charges (This Month)</span>
              <span className="font-medium text-lg">₹12,450.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Payment Due Date</span>
              <span className="font-medium">June 5, 2025</span>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-md">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Previous Invoice</span>
              <span>₹10,320.00</span>
            </div>
            <div className="text-muted-foreground text-xs pt-1">
              April 2025 • Paid on May 3, 2025
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full flex items-center gap-2 rounded-lg shadow">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
      </CardFooter>
    </Card>
  );
};
