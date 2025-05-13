
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { BillingCard } from '@/components/dashboard/BillingCard';
import { LoanCard } from '@/components/dashboard/LoanCard';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';
import { PaymentMethodChart } from '@/components/charts/PaymentMethodChart';
import { ChannelComparisonChart } from '@/components/charts/ChannelComparisonChart';
import { CreditCard, TrendingUp, RefreshCcw, Banknote, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { CounterCards } from '@/components/dashboard/CounterCards';
import { CountriesMap } from '@/components/dashboard/CountriesMap';

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Demo welcome notification when dashboard loads
    toast({
      title: "Welcome back!",
      description: "Your dashboard has been updated with the latest data.",
    });
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your business.
          </p>
        </div>
        
        <AlertsBanner />
        
        {/* New Stats Overview Section */}
        <StatsOverview />
        
        {/* KPI Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Sales Volume"
            value="د.إ345,600"
            description="This month"
            icon={<CreditCard className="h-6 w-6 text-primary" />}
            trend={{ value: 8.2, isPositive: true }}
            tooltipText="Total sales processed across all channels"
          />
          <StatCard
            title="Transactions"
            value="1,245"
            description="This month"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            trend={{ value: 5.1, isPositive: true }}
            tooltipText="Total number of transactions processed"
          />
          <StatCard
            title="Refunds"
            value="د.إ12,560"
            description="12 transactions"
            icon={<RefreshCcw className="h-6 w-6 text-primary" />}
            trend={{ value: 2.3, isPositive: false }}
            tooltipText="Total refunds processed this month"
          />
          <StatCard
            title="Outstanding Settlements"
            value="د.إ58,430"
            description="Due in T+2 days"
            icon={<Banknote className="h-6 w-6 text-primary" />}
            tooltipText="Amount to be settled to your bank account"
          />
          <StatCard
            title="Loan Balance"
            value="د.إ325,000"
            description="Next EMI: د.إ29,167"
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            tooltipText="Remaining business loan amount"
          />
        </div>
        
        {/* Counter Cards Section */}
        <CounterCards />
        
        {/* Countries Map Section */}
        <CountriesMap />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Transaction Volume" className="lg:col-span-2">
            <TransactionVolumeChart />
          </ChartCard>
          <ChartCard title="Payment Method Split">
            <PaymentMethodChart />
          </ChartCard>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Channel Comparison" className="lg:col-span-2">
            <ChannelComparisonChart />
          </ChartCard>
          <div className="space-y-6">
            <LoanCard />
            <BillingCard />
          </div>
        </div>
        
        {/* Transactions Table */}
        <TransactionTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
