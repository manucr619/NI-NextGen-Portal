import { DashboardLayout } from '@/components/layout/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your account and application settings.
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border-0 transition-all"
            style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
          >
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p>Your account configuration options will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
