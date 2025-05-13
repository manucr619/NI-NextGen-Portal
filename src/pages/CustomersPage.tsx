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
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border-0 flex items-center justify-center min-h-[400px] transition-all"
          style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
        >
          <p className="text-muted-foreground">Customer management interface will be available soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
