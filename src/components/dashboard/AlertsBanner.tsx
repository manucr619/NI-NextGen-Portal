
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'error' | 'info';
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
        <Alert key={alert.id} variant={alert.type === 'info' ? 'default' : 'destructive'}>
          <div className="flex justify-between items-start">
            <div className="flex">
              <ExclamationTriangleIcon className="h-4 w-4 mt-1" />
              <div className="ml-2">
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{alert.description}</span>
                </AlertDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                Take Action
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="h-6 w-6" 
                onClick={() => dismissAlert(alert.id)}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};
