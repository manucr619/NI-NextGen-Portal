
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Access insights and analytics for your business.
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Business Analytics</h2>
            <p>Your business reports and analytics will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
