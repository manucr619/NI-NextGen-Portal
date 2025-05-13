
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const CustomersPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all your customers information.
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Customer management interface will be available soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
