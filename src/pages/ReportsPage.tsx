import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportsFiltersBar } from '@/components/reports/ReportsFiltersBar';
import { ReportsTabs } from '@/components/reports/ReportsTabs';

const MOCK_ROLE = 'admin'; // or 'manager', 'viewer'

const ReportsPage = () => {
  const handleFiltersChange = (filters: any) => {
    // TODO: Implement filter logic
    console.log('Filters changed:', filters);
  };

  return (
    <DashboardLayout>
      <ReportsFiltersBar userRole={MOCK_ROLE} onFiltersChange={handleFiltersChange} />
      <div className="mt-6">
        <ReportsTabs userRole={MOCK_ROLE} />
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
