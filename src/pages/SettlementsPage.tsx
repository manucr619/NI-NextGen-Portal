import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Calendar, Banknote, Clock, XCircle, TrendingUp, Download, HelpCircle, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

const dateRanges = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Custom',
];
const statuses = ['All', 'Successful', 'Pending', 'Failed'];
const channels = ['All', 'POS', 'SoftPOS', 'Online Gateway'];
const bankAccounts = ['All Accounts', 'ICICI Bank', 'HDFC Bank', 'Axis Bank'];

const SettlementsPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(dateRanges[1]);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <nav className="text-xs text-muted-foreground mb-1">
              Dashboard / <span className="text-primary font-medium">Settlements</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight">Settlements</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            <div className="w-36">
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
            <div className="w-36">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg h-10">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-44">
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg h-10">
                  <SelectValue placeholder="Bank Account" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccounts.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Alerts / Notifications */}
        <AlertsBanner />

        {/* Top-Level KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Settled Amount"
            value="₹4,50,000"
            icon={<Banknote className="h-6 w-6 text-green-600" />}
            tooltipText="Total amount settled to your bank accounts."
            className="border-green-100"
          />
          <StatCard
            title="Settlements in Process"
            value="₹32,000"
            icon={<Loader2 className="h-6 w-6 text-orange-500 animate-spin" />}
            tooltipText="Amount currently being processed for settlement."
            className="border-orange-100"
          />
          <StatCard
            title="Failed Settlements"
            value="₹8,000"
            icon={<XCircle className="h-6 w-6 text-red-600" />}
            tooltipText="Amount of settlements that failed."
            className="border-red-100"
          />
          <StatCard
            title="Next Expected Settlement"
            value="June 12, 2025"
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            tooltipText="Your next scheduled settlement date."
            className="border-blue-100"
          />
        </div>

        {/* Settlement Trend Graph */}
        <ChartCard
          title="Settlement Trend"
          filterOptions={["By Day", "By Week", "By Channel", "By Product"]}
        >
          <div className="h-[300px] flex items-center justify-center text-gray-400">[Settlement Trend Chart]</div>
        </ChartCard>

        {/* Detailed Settlement Table */}
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-4 mt-2 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Settlement Details
            </div>
            <div className="flex gap-2">
              <button className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/90 flex items-center gap-1">
                <Download className="h-4 w-4" /> Export CSV
              </button>
              <button className="bg-white border border-primary text-primary px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/10 flex items-center gap-1">
                <Download className="h-4 w-4" /> Export PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="sticky top-0 bg-white/80 dark:bg-gray-900/80 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Bank</th>
                  <th className="px-4 py-2 text-left font-medium">Channel</th>
                  <th className="px-4 py-2 text-left font-medium">Amount</th>
                  <th className="px-4 py-2 text-left font-medium">Download</th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows, replace with real data */}
                <tr className="hover:bg-primary/5 transition cursor-pointer">
                  <td className="px-4 py-2"><CheckCircle className="h-5 w-5 text-green-500" aria-label="Successful" /></td>
                  <td className="px-4 py-2">12 Jun, 2025</td>
                  <td className="px-4 py-2">ICICI Bank</td>
                  <td className="px-4 py-2">POS</td>
                  <td className="px-4 py-2 font-semibold">₹1,20,000</td>
                  <td className="px-4 py-2">
                    <button className="text-primary hover:underline flex items-center gap-1"><Download className="h-4 w-4" /> PDF</button>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition cursor-pointer">
                  <td className="px-4 py-2"><Loader2 className="h-5 w-5 text-orange-500 animate-spin" aria-label="In Process" /></td>
                  <td className="px-4 py-2">12 Jun, 2025</td>
                  <td className="px-4 py-2">HDFC Bank</td>
                  <td className="px-4 py-2">Online Gateway</td>
                  <td className="px-4 py-2 font-semibold">₹32,000</td>
                  <td className="px-4 py-2">
                    <button className="text-primary hover:underline flex items-center gap-1"><Download className="h-4 w-4" /> PDF</button>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition cursor-pointer">
                  <td className="px-4 py-2"><XCircle className="h-5 w-5 text-red-500" aria-label="Failed" /></td>
                  <td className="px-4 py-2">11 Jun, 2025</td>
                  <td className="px-4 py-2">Axis Bank</td>
                  <td className="px-4 py-2">SoftPOS</td>
                  <td className="px-4 py-2 font-semibold">₹8,000</td>
                  <td className="px-4 py-2">
                    <button className="text-primary hover:underline flex items-center gap-1"><Download className="h-4 w-4" /> PDF</button>
                  </td>
                </tr>
                {/* Zero data state */}
                {/* <tr><td colSpan={6} className="text-center py-8 text-gray-400">No settlements yet. Start accepting payments.</td></tr> */}
              </tbody>
            </table>
          </div>
          {/* Pagination and search bar placeholder */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
            <input className="w-full md:w-64 rounded-lg border px-3 py-2 text-sm" placeholder="Search by bank, channel, or amount..." />
            <div className="flex gap-2">
              <button className="bg-white border border-primary text-primary px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/10">Previous</button>
              <button className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-medium shadow hover:bg-primary/90">Next</button>
            </div>
          </div>
        </div>

        {/* Call to Action / Help */}
        <div className="flex flex-col md:flex-row gap-2 justify-end mt-8">
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/90 flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Raise a Settlement Query
          </button>
          <button className="bg-white border border-primary text-primary px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/10 flex items-center gap-2">
            <FileText className="h-4 w-4" /> View Settlement Policy
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettlementsPage;
