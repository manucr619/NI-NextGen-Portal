import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';
import { ChannelComparisonChart } from '@/components/charts/ChannelComparisonChart';
import { PaymentMethodChart } from '@/components/charts/PaymentMethodChart';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { Info, ShoppingCart, Store, RefreshCw, ExternalLink, Users, TrendingUp, CreditCard, XCircle, CheckCircle, AlertTriangle, Key, Link2, MapPin, Smartphone, Monitor } from 'lucide-react';
import { useState } from 'react';

// --- Mock Data ---
const platforms = [
  {
    name: 'Shopify',
    status: 'connected',
    logo: '/logos/shopify.svg',
    cta: 'View Settings',
  },
  {
    name: 'WooCommerce',
    status: 'not_connected',
    logo: '/logos/woocommerce.svg',
    cta: 'Connect',
  },
  {
    name: 'Magento',
    status: 'connected',
    logo: '/logos/magento.svg',
    cta: 'View Settings',
  },
  {
    name: 'Custom API',
    status: 'connected',
    logo: '/logos/api.svg',
    cta: 'View Settings',
  },
];

const kpis = [
  {
    title: 'Total Online Revenue',
    value: '₹2,40,000',
    icon: <TrendingUp className="h-6 w-6 text-primary" />, 
    trend: { value: 8.2, isPositive: true },
    tooltipText: 'Total revenue from all online platforms.'
  },
  {
    title: 'Total Orders',
    value: '1,320',
    icon: <ShoppingCart className="h-6 w-6 text-primary" />, 
    trend: { value: 2.1, isPositive: true },
    tooltipText: 'Total number of orders placed.'
  },
  {
    title: 'AOV',
    value: '₹1,818',
    icon: <CreditCard className="h-6 w-6 text-primary" />, 
    trend: { value: 1.5, isPositive: false },
    tooltipText: 'Average order value.'
  },
  {
    title: 'Abandoned Checkouts',
    value: '7.2%',
    icon: <XCircle className="h-6 w-6 text-primary" />, 
    trend: { value: 0.8, isPositive: false },
    tooltipText: 'Percentage of checkouts not completed.'
  },
  {
    title: 'Refunds / Chargebacks',
    value: '₹12,000',
    icon: <AlertTriangle className="h-6 w-6 text-primary" />, 
    trend: { value: 0.5, isPositive: false },
    tooltipText: 'Total refunds and chargebacks.'
  },
  {
    title: 'Payment Success Rate',
    value: '96.4%',
    icon: <CheckCircle className="h-6 w-6 text-primary" />, 
    trend: { value: 1.1, isPositive: true },
    tooltipText: 'Percentage of successful payments.'
  },
];

const topProducts = [
  {
    image: '/products/shirt.png',
    name: 'Classic Shirt',
    sku: 'SH-001',
    unitsSold: 120,
    revenue: '₹24,000',
    platform: 'Shopify',
    platformUrl: 'https://shopify.com/product/SH-001',
  },
  {
    image: '/products/shoes.png',
    name: 'Running Shoes',
    sku: 'SH-002',
    unitsSold: 90,
    revenue: '₹18,000',
    platform: 'WooCommerce',
    platformUrl: 'https://woocommerce.com/product/SH-002',
  },
];

const customerInsights = {
  newVsReturning: [
    { name: 'New', value: 60 },
    { name: 'Returning', value: 40 },
  ],
  devices: [
    { name: 'Mobile', value: 70 },
    { name: 'Desktop', value: 30 },
  ],
  locations: [
    { city: 'Dubai', count: 320 },
    { city: 'Abu Dhabi', count: 210 },
    { city: 'Sharjah', count: 180 },
    { city: 'Ajman', count: 90 },
    { city: 'Al Ain', count: 75 },
    { city: 'Ras Al Khaimah', count: 60 },
    { city: 'Fujairah', count: 40 },
    { city: 'Umm Al Quwain', count: 25 },
  ],
  avgCheckoutTime: '2m 15s',
};

const recentOrders = [
  {
    date: '12-May-25',
    id: '#ORD8791',
    platform: 'Shopify',
    status: 'Paid',
    amount: 'AED 1,200',
    action: 'View',
  },
  {
    date: '11-May-25',
    id: '#ORD8788',
    platform: 'WooCommerce',
    status: 'Failed',
    amount: 'AED 0',
    action: 'Retry',
  },
];

const platformSettings = {
  apiKey: 'sk_live_1234abcd5678efgh',
  webhookUrl: 'https://merchant.ae/webhook',
  logHistory: [
    { date: '12-May-25', event: 'API Key Regenerated' },
    { date: '10-May-25', event: 'Webhook URL Updated' },
  ],
};

const customEcommerceAlerts = [
  {
    id: 'alert-1',
    title: 'Payment success dropped by 10% on Shopify in last 7 days',
    description: 'Investigate possible issues with Shopify integration.',
    type: 'warning',
  },
  {
    id: 'alert-2',
    title: 'WooCommerce integration not connected',
    description: 'Reconnect to continue receiving orders.',
    type: 'error',
  },
];

// --- Helper Components ---
function PlatformIntegrationStatusCard({ platforms }) {
  return (
    <div className="flex flex-col gap-4 w-full pb-2">
      {platforms.map((platform) => (
        <div
          key={platform.name}
          className="flex items-center gap-4 bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-4 min-w-[260px] h-[90px]"
        >
          <Avatar className="h-10 w-10 bg-gray-100 text-gray-500">
            {platform.logo ? (
              <AvatarImage src={platform.logo} alt={platform.name} />
            ) : (
              <AvatarFallback>{platform.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-base text-black truncate">{platform.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      {platform.status === 'connected' ? 'Platform is connected.' : 'Platform is not connected.'}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Badge
              variant={platform.status === 'connected' ? 'outline' : 'destructive'}
              className={
                platform.status === 'connected'
                  ? 'bg-blue-600 text-white border-blue-600 mt-1 px-3 py-1 rounded-full'
                  : 'bg-red-500 text-white border-red-500 mt-1 px-3 py-1 rounded-full'
              }
            >
              {platform.status === 'connected' ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>
          {platform.status === 'connected' ? (
            <Button size="sm" variant="outline" className="ml-2 border-gray-200 text-gray-900 font-medium px-4 py-2 rounded-lg shadow-none">
              View Settings
            </Button>
          ) : (
            <Button size="sm" variant="default" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-none">
              Connect
            </Button>
          )}
        </div>
      ))}
      <Button size="sm" variant="destructive" className="min-w-[180px] self-start bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-none">
        + Connect New Store
      </Button>
    </div>
  );
}

function ProductPerformanceTable({ products }) {
  return (
    <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all mt-4"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 rounded-t-2xl">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Top-Selling Products</h3>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[120px] h-8 text-xs bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-8 text-xs bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg">
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Shopify">Shopify</SelectItem>
              <SelectItem value="WooCommerce">WooCommerce</SelectItem>
              <SelectItem value="Magento">Magento</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-white/40 dark:bg-gray-900/40">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={product.image} alt={product.name} />
                    <AvatarFallback>{product.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.unitsSold}</TableCell>
                <TableCell>{product.revenue}</TableCell>
                <TableCell>
                  <Badge>{product.platform}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="link" asChild>
                    <a href={product.platformUrl} target="_blank" rel="noopener noreferrer">
                      View in Platform <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CustomerInsightsSection({ insights }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* New vs Returning Customers Pie */}
      <ChartCard title="New vs Returning Customers" filterOptions={[] as string[]}>
        <PaymentMethodChart />
      </ChartCard>
      {/* Devices Used Pie */}
      <ChartCard title="Devices Used" filterOptions={[] as string[]}>
        <PaymentMethodChart />
      </ChartCard>
      {/* Top Cities Table */}
      <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 rounded-t-2xl flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Top Cities</h3>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-white/40 dark:bg-gray-900/40">
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insights.locations.map((loc) => (
                <TableRow key={loc.city}>
                  <TableCell>{loc.city}</TableCell>
                  <TableCell>{loc.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function RecentOrdersTable({ orders }) {
  return (
    <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all mt-4"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 rounded-t-2xl">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Recent Orders</h3>
        <Button variant="outline" size="sm" className="h-8 gap-1 rounded-lg shadow">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-white/40 dark:bg-gray-900/40">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Badge>{order.platform}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Paid' ? 'default' : order.status === 'Failed' ? 'destructive' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Button size="sm" variant={order.status === 'Failed' ? 'destructive' : 'outline'}>
                    {order.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PlatformSettingsSection({ settings }) {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  return (
    <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all mt-4"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 rounded-t-2xl">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Platform Settings & API Keys</h3>
        <Button size="sm" variant="outline" onClick={() => setApiKey('sk_live_' + Math.random().toString(36).slice(2))}>
          Regenerate API Key
        </Button>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm">{apiKey}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>API Key for custom integrations</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          <span className="text-sm">Webhook URL:</span>
          <span className="font-mono text-xs">{settings.webhookUrl}</span>
        </div>
        <div>
          <div className="font-semibold text-sm mb-1">Log History</div>
          <ul className="text-xs text-gray-600 dark:text-gray-300 list-disc ml-5">
            {settings.logHistory.map((log, idx) => (
              <li key={idx}>{log.date}: {log.event}</li>
            ))}
          </ul>
        </div>
        <Button size="sm" variant="secondary">Add Credentials for New Store</Button>
      </div>
    </div>
  );
}

function StatCardScreenshot({ title, value, icon, trend, tooltipText }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col justify-between min-w-[200px] h-[110px]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-gray-500">{title}</span>
          {tooltipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>{tooltipText}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="bg-blue-50 rounded-full p-2 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-bold text-black">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold ml-2 ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}>{trend.isPositive ? '+' : '-'}{trend.value}%</span>
        )}
      </div>
    </div>
  );
}

// --- Main Page ---
const platformTabs = [
  { label: 'Shopify', value: 'Shopify' },
  { label: 'WooCommerce', value: 'WooCommerce' },
  { label: 'Magento', value: 'Magento' },
  { label: 'Others', value: 'Custom API' },
];

const dateFilters = ['Last 7 days', 'Last 30 days', 'This month', 'Custom'];

const ECommercePage = () => {
  const [activePlatform, setActivePlatform] = useState('Shopify');
  const [activeDate, setActiveDate] = useState(dateFilters[0]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Smart Alerts */}
        <AlertsBanner />

        {/* Header and Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">E-commerce</h1>
            <p className="text-gray-500 mt-1 text-base">Manage your online payment solutions.</p>
          </div>
          <Tabs value={activePlatform} onValueChange={setActivePlatform} className="mt-2 sm:mt-0">
            <TabsList className="bg-gray-50 border border-gray-200 rounded-lg">
              {platformTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="px-4 py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Platform Integration Status */}
        <PlatformIntegrationStatusCard platforms={platforms} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-2">
          {kpis.map((kpi) => (
            <StatCardScreenshot key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Graphs & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <ChartCard title="Revenue Over Time" filterOptions={dateFilters} onFilterChange={setActiveDate}>
            <TransactionVolumeChart />
          </ChartCard>
          <ChartCard title="Orders by Platform">
            <ChannelComparisonChart />
          </ChartCard>
          <ChartCard title="Payment Method Split">
            <PaymentMethodChart />
          </ChartCard>
        </div>

        {/* Product Performance */}
        <ProductPerformanceTable products={topProducts} />

        {/* Customer Insights */}
        <CustomerInsightsSection insights={customerInsights} />

        {/* Recent Orders Table */}
        <RecentOrdersTable orders={recentOrders} />

        {/* Platform Settings & API Keys */}
        <PlatformSettingsSection settings={platformSettings} />
      </div>
    </DashboardLayout>
  );
};

export default ECommercePage;
