import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalFilters } from '@/components/pos/TerminalFilters';
import { TerminalSummaryCards } from '@/components/pos/TerminalSummaryCards';
import { TerminalTable } from '@/components/pos/TerminalTable';
import { TerminalAnalyticsPanel } from '@/components/pos/TerminalAnalyticsPanel';
import { TerminalDetailsPanel } from '@/components/pos/TerminalDetailsPanel';
import { AlertBanner } from '@/components/pos/AlertBanner';
import { useState } from 'react';

const MOCK_ROLE = 'admin'; // or 'viewer'

const POSTerminalsPage = () => {
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POS Terminals</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all your deployed POS terminals across locations.
          </p>
        </div>
        <AlertBanner />
        <TerminalFilters role={MOCK_ROLE} />
        <TerminalSummaryCards role={MOCK_ROLE} />
        <TerminalTable 
          role={MOCK_ROLE} 
          onRowClick={(terminal) => { setSelectedTerminal(terminal); setShowDetails(true); }}
        />
        {MOCK_ROLE === 'admin' && <TerminalAnalyticsPanel />}
        <TerminalDetailsPanel 
          open={showDetails} 
          terminal={selectedTerminal} 
          onClose={() => setShowDetails(false)} 
          role={MOCK_ROLE}
        />
      </div>
    </DashboardLayout>
  );
};

export default POSTerminalsPage;
