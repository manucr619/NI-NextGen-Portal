import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Calendar } from 'lucide-react';

export const LoanCard = () => {
  // Demo values for the loan
  const loanAmount = 500000;
  const remainingAmount = 325000;
  const progress = 100 - (remainingAmount / loanAmount * 100);
  const nextEmi = 29167;
  const dueDate = "June 5, 2025";
  
  return (
    <Card className="overflow-hidden border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center text-gray-800 dark:text-gray-100">
          <DollarSign className="mr-2 h-5 w-5 text-primary" />
          Loan Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Loan Disbursed</span>
            <span className="font-medium">₹{loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining Balance</span>
            <span className="font-medium text-lg">₹{remainingAmount.toLocaleString()}</span>
          </div>
          <div>
            <Progress value={progress} className="h-2 rounded-full bg-primary/20" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Repaid: {Math.round(progress)}%</span>
              <span>Remaining: {Math.round(100 - progress)}%</span>
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              Next EMI Due
            </span>
            <span className="text-sm font-medium">{dueDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Amount</span>
            <span className="font-medium">₹{nextEmi.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex space-x-2 pt-2">
          <Button variant="secondary" size="sm" className="flex-1 rounded-lg shadow">
            Pay EMI
          </Button>
          <Button variant="outline" size="sm" className="flex-1 rounded-lg shadow">
            Loan Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
