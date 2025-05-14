import { useState, useEffect } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, RefreshCw, Mail, Eye, RotateCcw, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statCards = [
  {
    title: 'Total Sales Volume',
    value: '₹1,250,000',
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    trend: { value: 8.2, isPositive: true },
    tooltipText: 'Sum of all successful transaction amounts in the selected period.'
  },
  {
    title: 'Total Transactions',
    value: '4,320',
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    trend: { value: 3.1, isPositive: true },
    tooltipText: 'Number of transactions processed.'
  },
  {
    title: 'Avg. Order Value',
    value: '₹289',
    icon: <Info className="h-6 w-6 text-primary" />,
    tooltipText: 'Average value per transaction.'
  },
  {
    title: 'Refunds',
    value: '32 (₹18,000)',
    icon: <TrendingDown className="h-6 w-6 text-red-500" />,
    trend: { value: 1.5, isPositive: false },
    tooltipText: 'Total refunds issued and their amount.'
  },
  {
    title: 'Success Rate',
    value: '97.2%',
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    tooltipText: 'Percentage of successful transactions.'
  },
  {
    title: 'Failure Rate',
    value: '2.8%',
    icon: <TrendingDown className="h-6 w-6 text-red-500" />,
    tooltipText: 'Percentage of failed transactions.'
  },
];

const barData = [
  { channel: 'POS', Success: 1200, Failed: 30 },
  { channel: 'SoftPOS', Success: 900, Failed: 20 },
  { channel: 'Online', Success: 1800, Failed: 70 },
];

export const TransactionSummaryTab = ({ userRole }: { userRole: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-xl font-semibold">Transaction Summary</h2>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> View Transactions</Button>
          <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4 mr-1" /> Initiate Refund</Button>
          <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-1" /> Send Report to Email</Button>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
          : statCards.map((card, i) => (
            <StatCard key={card.title} {...card} />
          ))}
      </div>
      {/* Line Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">Transaction Volume Over Time <Info className="h-4 w-4 text-gray-400" /></h3>
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-4 border-0 transition-all">
          {loading ? <Skeleton className="h-[300px] w-full rounded-xl" /> : <TransactionVolumeChart />}
        </div>
      </div>
      {/* Bar Chart: Success vs Failed by Channel */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">Success vs Failed by Channel <Info className="h-4 w-4 text-gray-400" /></h3>
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-4 border-0 transition-all">
          {loading ? (
            <Skeleton className="h-[300px] w-full rounded-xl" />
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Success" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      {/* Quick Table: Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">Recent Transactions <Info className="h-4 w-4 text-gray-400" /></h3>
        {loading ? <Skeleton className="h-40 w-full rounded-xl" /> : <TransactionTable />}
      </div>
    </div>
  );
}; 