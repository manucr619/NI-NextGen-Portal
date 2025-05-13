import React from 'react';

interface TerminalDetailsPanelProps {
  open: boolean;
  terminal: any;
  onClose: () => void;
  role: 'admin' | 'viewer';
}

const mockTransactions = [
  { id: 'TXN-001', amount: 'AED 200', time: '10:40 AM' },
  { id: 'TXN-002', amount: 'AED 1,000', time: '10:20 AM' },
  { id: 'TXN-003', amount: 'AED 500', time: '09:50 AM' },
];

export const TerminalDetailsPanel: React.FC<TerminalDetailsPanelProps> = ({ open, terminal, onClose, role }) => {
  if (!open || !terminal) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl p-6 overflow-y-auto relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-2">Terminal Details</h2>
        <div className="mb-4">
          <div className="text-xs text-gray-500">Terminal ID</div>
          <div className="font-mono font-semibold text-lg">{terminal.id}</div>
        </div>
        <div className="mb-2 flex gap-4">
          <div>
            <div className="text-xs text-gray-500">Store</div>
            <div className="font-medium">{terminal.store}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Firmware</div>
            <div className="font-medium">{terminal.firmware}</div>
          </div>
        </div>
        <div className="mb-2 flex gap-4">
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div className="font-medium">{terminal.status}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Last Transaction</div>
            <div className="font-medium">{terminal.lastTransaction}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500">Activation Date</div>
          <div className="font-medium">2024-05-01</div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Last 10 Transactions</div>
          <ul className="divide-y divide-gray-200">
            {mockTransactions.map(txn => (
              <li key={txn.id} className="py-2 flex justify-between text-sm">
                <span>{txn.id}</span>
                <span>{txn.amount}</span>
                <span>{txn.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {role === 'admin' && (
          <div className="flex gap-2 mt-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow">Replace</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow">Update Firmware</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow">Disable</button>
          </div>
        )}
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}; 