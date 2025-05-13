import React from 'react';
import { Monitor, CheckCircle, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface TerminalSummaryCardsProps {
  role: 'admin' | 'viewer';
}

const kpiData = [
  {
    label: 'Total Terminals',
    value: 24,
    icon: <Monitor className="h-6 w-6 text-blue-600" />, 
    color: 'bg-blue-100',
  },
  {
    label: 'Active Devices',
    value: 19,
    icon: <CheckCircle className="h-6 w-6 text-green-600" />, 
    color: 'bg-green-100',
  },
  {
    label: 'Attention Needed',
    value: 2,
    icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />, 
    color: 'bg-yellow-100',
  },
  {
    label: 'Transactions Today',
    value: 134,
    icon: <TrendingUp className="h-6 w-6 text-indigo-600" />, 
    color: 'bg-indigo-100',
  },
  {
    label: 'Last Sync',
    value: '10:52 AM',
    icon: <Clock className="h-6 w-6 text-gray-600" />, 
    color: 'bg-gray-100',
  },
];

export const TerminalSummaryCards: React.FC<TerminalSummaryCardsProps> = ({ role }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {kpiData.map((kpi) => (
        <div key={kpi.label} className={`rounded-2xl p-4 flex items-center gap-4 shadow-md ${kpi.color}`}>
          <div className="rounded-full bg-white p-2 shadow">
            {kpi.icon}
          </div>
          <div>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-xs text-gray-600 font-medium mt-1">{kpi.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}; 