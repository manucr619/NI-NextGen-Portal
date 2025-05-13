
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const LoanServicesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business loans and financing options.
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Loan Overview</h2>
            <p>Your business loan status and options will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoanServicesPage;
