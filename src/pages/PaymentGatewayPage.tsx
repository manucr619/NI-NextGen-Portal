import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { PaymentMethodChart } from '@/components/charts/PaymentMethodChart';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { CreditCard, TrendingUp, RefreshCw, Repeat, Settings, AlertTriangle, CheckCircle, XCircle, PlugZap, FileText, Calendar, Download } from 'lucide-react';
import { useState } from 'react';

const merchants = [
  { id: 'm1', name: 'Acme Corp' },
  { id: 'm2', name: 'Globex Retail' },
];

const dateRanges = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Custom',
];

const PaymentGatewayPage = () => {
  const [selectedMerchant, setSelectedMerchant] = useState(merchants[0].id);
  const [selectedDateRange, setSelectedDateRange] = useState(dateRanges[1]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top Navigation / Context Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <nav className="text-xs text-muted-foreground mb-1">
              Dashboard / <span className="text-primary font-medium">Payment Gateway</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight">Payment Gateway</h1>
          </div>
          <div className="flex gap-2 items-end">
            <div className="w-48">
              <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
                <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg h-10">
                  <SelectValue placeholder="Select Merchant" />
                </SelectTrigger>
                <SelectContent>
                  {merchants.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg h-10">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Alerts & Recommendations */}
        <AlertsBanner />

        {/* KPIs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Payment Volume"
            value="₹2,45,000"
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
            tooltipText="Total value of all payments processed in the selected period."
            className="border-blue-100"
          />
          <StatCard
            title="Success Rate"
            value="96.2%"
            icon={<CheckCircle className="h-6 w-6 text-green-600" />}
            tooltipText="Percentage of successful transactions."
            trend={{ value: 1.2, isPositive: true }}
            className="border-green-100"
          />
          <StatCard
            title="Failed Transactions"
            value="12"
            icon={<XCircle className="h-6 w-6 text-red-600" />}
            tooltipText="Number of failed transactions."
            trend={{ value: 0.8, isPositive: false }}
            className="border-red-100"
          />
          <StatCard
            title="Refunds Issued"
            value="5"
            icon={<RefreshCw className="h-6 w-6 text-yellow-600" />}
            tooltipText="Total refunds processed."
            className="border-yellow-100"
          />
          <StatCard
            title="Active UPI IDs / Cards / Plugins"
            value="8"
            icon={<PlugZap className="h-6 w-6 text-indigo-600" />}
            tooltipText="Number of active payment methods and plugins."
            className="border-indigo-100"
          />
        </div>

        {/* Transaction Volume Over Time */}
        <ChartCard
          title="Transaction Volume Over Time"
          filterOptions={["By Day", "By Week", "By Month"]}
        >
          <TransactionVolumeChart />
        </ChartCard>

        {/* Recent Transactions Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionTable />
          </div>
          {/* Refunds & Chargebacks Section */}
          <div className="space-y-4">
            <ChartCard title="Refunds & Chargebacks" filterOptions={["This Month", "Last Month", "Custom"]}>
              {/* Placeholder for small bar chart */}
              <div className="h-32 flex items-center justify-center text-gray-400">[Refunds Trend Chart]</div>
            </ChartCard>
            <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Refunds this month</span>
                <span className="font-semibold">₹2,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Chargebacks</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending Refunds</span>
                <span className="font-semibold">2</span>
              </div>
              <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/90">Initiate New Refund</button>
            </div>
          </div>
        </div>

        {/* Plugin & Integration Management Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Plugins & Integrations">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PlugZap className="h-5 w-5 text-green-500" />
                <span className="font-medium">Shopify</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">OK</span>
              </div>
              <div className="flex items-center gap-3">
                <PlugZap className="h-5 w-5 text-green-500" />
                <span className="font-medium">WooCommerce</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">OK</span>
              </div>
              <div className="flex items-center gap-3">
                <PlugZap className="h-5 w-5 text-red-500" />
                <span className="font-medium">Magento</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Issue</span>
              </div>
              <div className="flex items-center gap-3">
                <PlugZap className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Custom API</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">OK</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/90">Add/Manage API Keys</button>
                <button className="bg-white border border-primary text-primary px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/10">View Integration Docs</button>
              </div>
            </div>
          </ChartCard>

          {/* Settlement Summary */}
          <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 flex flex-col gap-3 justify-between h-full">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">Settlement Summary</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Upcoming Settlement Date</span>
              <span className="font-semibold">June 10, 2025</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Amount Settling Next</span>
              <span className="font-semibold">₹18,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Settlement Delay</span>
              <span className="font-semibold text-red-600">1 day</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-2 justify-end mt-8">
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/90 flex items-center gap-2">
            <Download className="h-4 w-4" /> Download Full Report
          </button>
          <button className="bg-white border border-primary text-primary px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/10 flex items-center gap-2">
            <Settings className="h-4 w-4" /> Go to Settings
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentGatewayPage;
