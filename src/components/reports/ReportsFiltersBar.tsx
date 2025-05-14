import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, MapPin, CreditCard, Calendar as CalendarIcon } from 'lucide-react';

const SERVICES = [
  { label: 'All Services', value: 'all' },
  { label: 'POS Terminals', value: 'pos' },
  { label: 'SoftPOS', value: 'softpos' },
  { label: 'E-commerce Gateway', value: 'ngo' },
  { label: 'Online Checkout', value: 'online' },
  { label: 'Biz2x Loans', value: 'loans' },
  { label: 'Digital Onboarding', value: 'onboarding' },
];
const PAYMENT_METHODS = [
  { label: 'All Methods', value: 'all' },
  { label: 'Card', value: 'card' },
  { label: 'UPI', value: 'upi' },
  { label: 'Wallet', value: 'wallet' },
  { label: 'Netbanking', value: 'netbanking' },
];
const LOCATIONS = [
  { label: 'All Locations', value: 'all' },
  { label: 'Store 1', value: 'store1' },
  { label: 'Store 2', value: 'store2' },
];

export const ReportsFiltersBar = ({ userRole, onFiltersChange }: { userRole: string, onFiltersChange: (filters: any) => void }) => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined, to: Date | undefined }>({ from: undefined, to: undefined });
  const [service, setService] = useState('all');
  const [location, setLocation] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');

  const handleExport = (type: string) => {
    // Implement export logic
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { dateRange, service, location, paymentMethod, [key]: value };
    onFiltersChange(newFilters);
  };

  return (
    <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-wrap gap-3 items-center shadow-sm">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-primary" />
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => { setDateRange(range as any); handleFilterChange('dateRange', range); }}
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <Select value={service} onValueChange={(v) => { setService(v); handleFilterChange('service', v); }}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SERVICES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <Select value={location} onValueChange={(v) => { setLocation(v); handleFilterChange('location', v); }}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {LOCATIONS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        <Select value={paymentMethod} onValueChange={(v) => { setPaymentMethod(v); handleFilterChange('paymentMethod', v); }}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {PAYMENT_METHODS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {(userRole === 'admin' || userRole === 'manager') && (
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')}><Download className="mr-1 h-4 w-4" /> CSV</Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('excel')}><Download className="mr-1 h-4 w-4" /> Excel</Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}><Download className="mr-1 h-4 w-4" /> PDF</Button>
        </div>
      )}
    </div>
  );
}; 