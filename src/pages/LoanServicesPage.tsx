import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { LoanCard } from '@/components/dashboard/LoanCard';
import { AlertsBanner } from '@/components/dashboard/AlertsBanner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Calendar, DollarSign, TrendingDown, TrendingUp, AlertCircle, FileText, Download, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { TransactionVolumeChart } from '@/components/charts/TransactionVolumeChart';

// Mock role and data
const MOCK_ROLE: 'admin' | 'viewer' | 'manager' = 'admin';

const summaryCards = [
  {
    title: 'Total Loan Amount Sanctioned',
    value: '₹12,50,000',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    tooltipText: 'Sum of all loans sanctioned to your business.'
  },
  {
    title: 'Outstanding Balance',
    value: '₹3,25,000',
    icon: <TrendingDown className="h-6 w-6 text-blue-500" />,
    tooltipText: 'Total principal outstanding across all active loans.'
  },
  {
    title: 'Next EMI Due',
    value: '₹29,167',
    icon: <Calendar className="h-6 w-6 text-emerald-500" />,
    tooltipText: 'Your next EMI amount and due date.'
  },
  {
    title: 'Current Loan Status',
    value: 'Active',
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    tooltipText: 'Status of your current active loan.',
    className: 'border-l-4 border-green-500'
  },
];

const loanTypes = ['Term Loan', 'Line of Credit', 'Overdraft'];
const timePeriods = ['Last 3 months', 'Last 6 months', 'Last 12 months', 'All-time'];

const activeLoans = [
  {
    id: 'LN-2024-001',
    type: 'Term Loan',
    sanctioned: 500000,
    disbursed: 500000,
    interest: 12.5,
    emi: 29167,
    frequency: 'Monthly',
    tenure: '01 Jan 2024 - 01 Jan 2025',
    status: 'Active',
    statusColor: 'text-green-600',
  },
  {
    id: 'LN-2023-002',
    type: 'Overdraft',
    sanctioned: 250000,
    disbursed: 200000,
    interest: 14.0,
    emi: 0,
    frequency: 'Flexible',
    tenure: '15 Mar 2023 - 15 Mar 2024',
    status: 'Pending Approval',
    statusColor: 'text-yellow-600',
  },
];

const emiSchedule = [
  { emiNo: 1, date: '01 Feb 2024', status: 'Paid', principal: 25000, interest: 4167, receipt: true },
  { emiNo: 2, date: '01 Mar 2024', status: 'Paid', principal: 25000, interest: 4167, receipt: true },
  { emiNo: 3, date: '01 Apr 2024', status: 'Upcoming', principal: 25000, interest: 4167, receipt: false },
  { emiNo: 4, date: '01 May 2024', status: 'Upcoming', principal: 25000, interest: 4167, receipt: false },
];

const loanHistory = [
  { id: 'LN-2022-003', amount: 400000, status: 'Closed', duration: '12m', settlement: '01 Jan 2023' },
  { id: 'LN-2021-004', amount: 300000, status: 'Repaid Early', duration: '8m', settlement: '01 Sep 2022' },
  { id: 'LN-2020-005', amount: 200000, status: 'Defaulted', duration: '6m', settlement: '01 Jun 2021' },
];

export default function LoanServicesPage() {
  const isMobile = useIsMobile();
  const [selectedLoan, setSelectedLoan] = useState(activeLoans[0]);
  const [emiModalOpen, setEmiModalOpen] = useState(false);
  const [selectedEMI, setSelectedEMI] = useState(null);
  const canApply = MOCK_ROLE === 'admin';

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
                  <BreadcrumbPage>Loan Services</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold tracking-tight">Loan Services</h1>
          </div>
          {canApply && (
            <Button className="rounded-lg h-11 px-6 text-base font-semibold shadow" variant="default">
              ➕ Apply for New Loan
            </Button>
          )}
        </div>

        {/* Alerts and Notifications */}
        <AlertsBanner />

        {/* Loan Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Loan Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="EMI Payment History"
            filterOptions={timePeriods}
            onFilterChange={() => {}}
          >
            {/* Replace with actual EMI payment chart */}
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <TransactionVolumeChart />
            </div>
          </ChartCard>
          <ChartCard
            title="Interest vs Principal Repayment"
            filterOptions={loanTypes}
            onFilterChange={() => {}}
          >
            {/* Replace with actual bar chart */}
            <div className="h-64 flex items-center justify-center text-muted-foreground">[Bar Chart]</div>
          </ChartCard>
        </div>

        {/* Active Loan Details Panel */}
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Active Loan Details</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                {activeLoans.map((loan) => (
                  <Button
                    key={loan.id}
                    variant={selectedLoan.id === loan.id ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-lg"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    {loan.type} ({loan.id})
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Loan ID</div>
                  <div className="font-mono font-semibold">{selectedLoan.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="font-medium">{selectedLoan.type}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Sanctioned</div>
                  <div className="font-medium">₹{selectedLoan.sanctioned.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Disbursed</div>
                  <div className="font-medium">₹{selectedLoan.disbursed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Interest Rate</div>
                  <div className="font-medium">{selectedLoan.interest}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">EMI Amount</div>
                  <div className="font-medium">₹{selectedLoan.emi.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Repayment Frequency</div>
                  <div className="font-medium">{selectedLoan.frequency}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tenure</div>
                  <div className="font-medium">{selectedLoan.tenure}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className={`font-semibold ${selectedLoan.statusColor}`}>{selectedLoan.status}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Dialog open={emiModalOpen} onOpenChange={setEmiModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setEmiModalOpen(true)}>
                      <FileText className="h-4 w-4 mr-1" /> View EMI Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>EMI Schedule for {selectedLoan.id}</DialogTitle>
                      <DialogDescription>Detailed breakdown of your EMI payments.</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-xs text-gray-500 uppercase">
                            <th className="px-2 py-1 text-left">EMI #</th>
                            <th className="px-2 py-1 text-left">Date</th>
                            <th className="px-2 py-1 text-left">Status</th>
                            <th className="px-2 py-1 text-left">Principal</th>
                            <th className="px-2 py-1 text-left">Interest</th>
                            <th className="px-2 py-1 text-left">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emiSchedule.map((emi) => (
                            <tr key={emi.emiNo} className="border-b last:border-0">
                              <td className="px-2 py-1">{emi.emiNo}</td>
                              <td className="px-2 py-1">{emi.date}</td>
                              <td className="px-2 py-1">
                                {emi.status === 'Paid' ? (
                                  <span className="text-green-600 font-medium">Paid</span>
                                ) : (
                                  <span className="text-yellow-600 font-medium">Upcoming</span>
                                )}
                              </td>
                              <td className="px-2 py-1">₹{emi.principal.toLocaleString()}</td>
                              <td className="px-2 py-1">₹{emi.interest.toLocaleString()}</td>
                              <td className="px-2 py-1">
                                {emi.receipt ? (
                                  <Button variant="outline" size="icon" className="rounded-full"><Download className="h-4 w-4" /></Button>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
                {MOCK_ROLE === 'admin' && (
                  <Button variant="secondary" size="sm" className="rounded-lg">
                    <Eye className="h-4 w-4 mr-1" /> Make Prepayment
                  </Button>
                )}
                {(MOCK_ROLE === 'admin' || MOCK_ROLE === 'manager') && (
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Download className="h-4 w-4 mr-1" /> Download Agreement
                  </Button>
                )}
              </div>
            </div>
            {/* Optionally, show a LoanCard snapshot or other info here */}
            <div className="w-full md:w-80 flex-shrink-0">
              <LoanCard />
            </div>
          </div>
        </div>

        {/* Loan History Section */}
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Loan History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-2 py-1 text-left">Loan ID</th>
                  <th className="px-2 py-1 text-left">Amount</th>
                  <th className="px-2 py-1 text-left">Status</th>
                  <th className="px-2 py-1 text-left">Duration</th>
                  <th className="px-2 py-1 text-left">Final Settlement</th>
                  <th className="px-2 py-1 text-left">Summary</th>
                </tr>
              </thead>
              <tbody>
                {loanHistory.map((loan) => (
                  <tr key={loan.id} className="border-b last:border-0">
                    <td className="px-2 py-1 font-mono font-semibold">{loan.id}</td>
                    <td className="px-2 py-1">₹{loan.amount.toLocaleString()}</td>
                    <td className="px-2 py-1">
                      {loan.status === 'Closed' && <span className="text-gray-500">Closed</span>}
                      {loan.status === 'Repaid Early' && <span className="text-blue-600">Repaid Early</span>}
                      {loan.status === 'Defaulted' && <span className="text-red-600">Defaulted</span>}
                    </td>
                    <td className="px-2 py-1">{loan.duration}</td>
                    <td className="px-2 py-1">{loan.settlement}</td>
                    <td className="px-2 py-1">
                      <Button variant="outline" size="icon" className="rounded-full"><Download className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Future Enhancements Placeholder */}
        <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-4 items-center justify-between border-dashed border-2 border-primary/30 mt-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-primary" />
            <span className="font-medium text-primary">Coming Soon: Loan Calculator &amp; Chatbot for EMI queries</span>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg">Suggest a Feature</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
