import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  type?: 'info' | 'warning' | 'error';
}

const demoAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'KYC Verification Pending',
    description: 'Please complete your KYC verification to avoid service interruption.',
    type: 'warning',
  },
  {
    id: 'alert-2',
    title: 'Failed Payout',
    description: 'A payout of ₹25,000 to vendor XYZ has failed. Action required.',
    type: 'error',
  },
];

export const AlertsBanner = () => {
  const [alerts, setAlerts] = useState<Alert[]>(demoAlerts);
  
  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  if (alerts.length === 0) return null;
  
  return (
    <div className="space-y-3 animate-fade-in">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl border-0 p-0 transition-all"
          style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
        >
          <Alert variant={alert.type === 'info' ? 'default' : 'destructive'} className="rounded-2xl bg-transparent border-0 p-4">
            <div className="flex justify-between items-start">
              <div className="flex">
                <TriangleAlert className="h-4 w-4 mt-1 text-yellow-500 dark:text-yellow-400" />
                <div className="ml-2">
                  <AlertTitle className="font-semibold text-gray-800 dark:text-gray-100">{alert.title}</AlertTitle>
                  <AlertDescription className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span>{alert.description}</span>
                  </AlertDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs rounded-lg shadow">
                  Take Action
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      ))}
    </div>
  );
};
