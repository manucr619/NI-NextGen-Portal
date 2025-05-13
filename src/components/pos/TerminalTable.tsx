import React from 'react';

const mockTerminals = [
  {
    id: 'POS-10233',
    store: 'Dubai Mall',
    status: 'Active',
    lastTransaction: 'AED 1,200 – 10:45 AM',
    firmware: 'v3.2.1',
  },
  {
    id: 'POS-10234',
    store: 'Marina Walk',
    status: 'Faulty',
    lastTransaction: 'AED 0 – 09:10 AM',
    firmware: 'v3.1.9',
  },
  {
    id: 'POS-10235',
    store: 'Abu Dhabi HQ',
    status: 'Inactive',
    lastTransaction: 'AED 2,500 – 08:30 AM',
    firmware: 'v3.2.1',
  },
  {
    id: 'POS-10236',
    store: 'Dubai Mall',
    status: 'Pending',
    lastTransaction: 'AED 0 – --',
    firmware: 'v3.2.0',
  },
];

const statusColors = {
  'Active': 'bg-green-100 text-green-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Faulty': 'bg-red-100 text-red-700',
  'Inactive': 'bg-gray-200 text-gray-700',
};

interface TerminalTableProps {
  role: 'admin' | 'viewer';
  onRowClick: (terminal: any) => void;
}

export const TerminalTable: React.FC<TerminalTableProps> = ({ role, onRowClick }) => {
  return (
    <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-xs text-gray-500 uppercase">
            <th className="px-6 py-3 text-left">Terminal ID</th>
            <th className="px-6 py-3 text-left">Store Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Last Transaction</th>
            <th className="px-6 py-3 text-left">Firmware</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockTerminals.map((terminal) => (
            <tr key={terminal.id} className="hover:bg-primary/5 cursor-pointer transition" onClick={() => onRowClick(terminal)}>
              <td className="px-6 py-4 font-mono font-semibold">{terminal.id}</td>
              <td className="px-6 py-4">{terminal.store}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusColors[terminal.status]}`}>{terminal.status}</span>
              </td>
              <td className="px-6 py-4">{terminal.lastTransaction}</td>
              <td className="px-6 py-4">{terminal.firmware}</td>
              <td className="px-6 py-4">
                {role === 'admin' ? (
                  <div className="relative">
                    <button className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium">Actions</button>
                    {/* Dropdown menu can be implemented here */}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">View Only</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 