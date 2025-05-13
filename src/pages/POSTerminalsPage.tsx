
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const POSTerminalsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POS Terminals</h1>
          <p className="text-muted-foreground mt-1">
            Manage your point-of-sale terminals and hardware.
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Terminal Management</h2>
            <p>Your POS terminal inventory and status will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POSTerminalsPage;
