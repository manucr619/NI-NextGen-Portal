import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { TerminalTable } from '@/components/pos/TerminalTable';
import { TerminalFilters } from '@/components/pos/TerminalFilters';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Smartphone, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const merchants = [
  { id: 'm1', name: 'Acme Retailers' },
  { id: 'm2', name: 'Global Mart' },
];

const kpiData = [
  {
    label: 'Active Devices',
    value: 12,
    icon: <Smartphone className="h-6 w-6 text-blue-600" />, 
    color: 'bg-blue-100',
  },
  {
    label: 'Transactions Today',
    value: '134 | $12,400',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />, 
    color: 'bg-green-100',
  },
  {
    label: 'Failed Transactions',
    value: 3,
    icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />, 
    color: 'bg-yellow-100',
  },
  {
    label: 'Latest App Version Coverage',
    value: '92%',
    icon: <CheckCircle className="h-6 w-6 text-indigo-600" />, 
    color: 'bg-indigo-100',
  },
];

const SoftPOSPage = () => {
  const [selectedMerchant, setSelectedMerchant] = useState(merchants[0].id);
  const [role] = useState<'admin' | 'viewer'>('admin'); // mock role

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>SoftPOS</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold tracking-tight">SoftPOS Overview</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">Merchant:</span>
            <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {merchants.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <StatCard
              key={kpi.label}
              title={kpi.label}
              value={kpi.value.toString()}
              icon={kpi.icon}
              className={kpi.color}
            />
          ))}
        </div>

        {/* Usage Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Transactions Over Time" filterOptions={["Daily", "Weekly"]}>
            {/* Replace with actual chart */}
            <div className="h-64 flex items-center justify-center text-muted-foreground">[Line Chart]</div>
          </ChartCard>
          <ChartCard title="Transactions by Location">
            {/* Replace with actual chart */}
            <div className="h-64 flex items-center justify-center text-muted-foreground">[Heatmap/Bar Chart]</div>
          </ChartCard>
        </div>

        {/* Quick Actions & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button variant="default" className="rounded-lg">➕ Onboard New Device</Button>
            <Button variant="secondary" className="rounded-lg">🔁 Send App Update</Button>
            <Button variant="outline" className="rounded-lg">📥 Download Usage Report</Button>
          </div>
          <div className="min-w-[300px]">
            <TerminalFilters role={role} />
          </div>
        </div>

        {/* Devices Table Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Devices</h2>
          <TerminalTable role={role} onRowClick={() => {}} />
        </div>

        {/* Alerts / Notifications Panel */}
        <div>
          <AlertsBanner />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SoftPOSPage;
