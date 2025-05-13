import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';
import { PaymentMethodChart } from '@/components/charts/PaymentMethodChart';
import { ChannelComparisonChart } from '@/components/charts/ChannelComparisonChart';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Info, TrendingUp, XCircle, RefreshCw, Clock, ArrowDownCircle, Link2, Download, CornerDownLeft, FileText } from 'lucide-react';
import { useState } from 'react';

const PaymentsPage = () => {
  // TODO: Replace with real filter state and handlers
  const [dateRange, setDateRange] = useState(null);
  const [channel, setChannel] = useState('all');
  const [method, setMethod] = useState('all');
  const [status, setStatus] = useState('all');
  const [store, setStore] = useState('all');

  // TODO: Replace with real KPI data
  const kpis = [
    {
      title: 'Total Payment Volume',
      value: '₹2,45,000',
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      tooltip: 'This is the total value of all successful payments in this period.',
    },
    {
      title: 'Total Transactions',
      value: '1,234',
      icon: <CornerDownLeft className="h-6 w-6 text-primary" />,
      tooltip: 'Number of payment transactions across all channels.',
    },
    {
      title: 'Failed Payments',
      value: '12',
      icon: <XCircle className="h-6 w-6 text-red-500" />,
      tooltip: 'Payments that failed to process.',
    },
    {
      title: 'Refunds Issued',
      value: '₹8,500',
      icon: <ArrowDownCircle className="h-6 w-6 text-amber-500" />,
      tooltip: 'Total value of refunds issued in this period.',
    },
    {
      title: 'Pending Settlements',
      value: '₹15,000',
      icon: <Clock className="h-6 w-6 text-gray-500" />,
      tooltip: 'Payments not yet settled to your account.',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header & Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <p className="text-muted-foreground mt-1">Manage your payment transactions and settings.</p>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            {/* Date Range Picker (placeholder) */}
            <div>
              <label className="block text-xs font-medium mb-1">Date Range</label>
              {/* TODO: Replace with real date range picker */}
              <Button variant="outline" size="sm">Today ▼</Button>
            </div>
            {/* Channel Selector */}
            <div>
              <label className="block text-xs font-medium mb-1">Channel</label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                  <SelectItem value="SoftPOS">SoftPOS</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="QR">QR</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-medium mb-1">Payment Method</label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                  <SelectItem value="Netbanking">Netbanking</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium mb-1">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Store Location/Branch (optional) */}
            <div>
              <label className="block text-xs font-medium mb-1">Store</label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="store1">Store 1</SelectItem>
                  <SelectItem value="store2">Store 2</SelectItem>
                  {/* TODO: Populate with real store/branch data */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* KPI Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="cursor-pointer">
              <StatCard
                title={kpi.title}
                value={kpi.value}
                icon={kpi.icon}
                tooltipText={kpi.tooltip}
              />
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Line Chart */}
          <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 border-0 transition-all flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Payment Trends</h2>
              {/* TODO: Add metric/timeframe toggles */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Last 7 days</Button>
                <Button variant="ghost" size="sm">Last 30 days</Button>
                <Button variant="ghost" size="sm">Custom</Button>
              </div>
            </div>
            <TransactionVolumeChart />
          </div>
          {/* Right: Pie/Bar Chart */}
          <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 border-0 transition-all flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">By Payment Method</h2>
              {/* TODO: Add toggle for method/channel */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Method</Button>
                <Button variant="ghost" size="sm">Channel</Button>
              </div>
            </div>
            {/* Default: PaymentMethodChart, toggle to ChannelComparisonChart */}
            <PaymentMethodChart />
          </div>
        </div>

        {/* Transaction Table Section */}
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 border-0 transition-all flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="font-semibold text-lg">Transactions</div>
            <div className="flex gap-2 items-center">
              {/* TODO: Implement search and export */}
              <input
                type="text"
                placeholder="Search by customer or transaction ID"
                className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ minWidth: 220 }}
              />
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>
          <TransactionTable />
          {/* TODO: Add Pagination below table */}
        </div>

        {/* Quick Actions Panel */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:static md:flex-row md:justify-end md:items-center">
          <Button variant="secondary" size="lg" className="gap-2 rounded-xl shadow" title="Create Payment Link">
            <Link2 className="h-5 w-5" /> Create Payment Link
          </Button>
          <Button variant="outline" size="lg" className="gap-2 rounded-xl shadow" title="Issue Refund">
            <RefreshCw className="h-5 w-5" /> Issue Refund
          </Button>
          <Button variant="outline" size="lg" className="gap-2 rounded-xl shadow" title="Initiate Settlement">
            <ArrowDownCircle className="h-5 w-5" /> Initiate Settlement
          </Button>
          <Button variant="outline" size="lg" className="gap-2 rounded-xl shadow" title="Download Transactions Report">
            <FileText className="h-5 w-5" /> Download Report
          </Button>
        </div>

        {/* TODO: Empty state illustration if no payments */}
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;
