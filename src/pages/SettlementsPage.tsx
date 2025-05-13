
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const SettlementsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settlements</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your payment settlements.
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Settlement History</h2>
            <p>Your settlement records and history will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettlementsPage;
