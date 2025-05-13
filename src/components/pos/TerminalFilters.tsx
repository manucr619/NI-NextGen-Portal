import React from 'react';

interface TerminalFiltersProps {
  role: 'admin' | 'viewer';
}

export const TerminalFilters: React.FC<TerminalFiltersProps> = ({ role }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white/70 dark:bg-gray-900/70 p-4 rounded-2xl shadow-md">
      <div className="flex-1">
        <label className="block text-xs font-medium mb-1">Location</label>
        <select className="w-full rounded-lg border px-3 py-2">
          <option>All Locations</option>
          <option>Dubai Mall</option>
          <option>Marina Walk</option>
          <option>Abu Dhabi HQ</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium mb-1">Status</label>
        <select className="w-full rounded-lg border px-3 py-2">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Faulty</option>
          <option>Pending Activation</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium mb-1">Search</label>
        <input className="w-full rounded-lg border px-3 py-2" placeholder="Terminal ID, Store, Serial..." />
      </div>
      {role === 'admin' && (
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-primary/90">Export CSV</button>
      )}
    </div>
  );
}; 