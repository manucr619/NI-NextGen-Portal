import React from 'react';

export const TerminalAnalyticsPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-md p-6 flex flex-col items-center">
        <div className="text-lg font-semibold mb-2">Transaction Volume</div>
        <div className="w-full h-32 bg-gradient-to-r from-blue-200 to-blue-400 rounded-xl flex items-center justify-center text-blue-700">[Graph]</div>
      </div>
      <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-md p-6 flex flex-col items-center">
        <div className="text-lg font-semibold mb-2">Activity Heatmap</div>
        <div className="w-full h-32 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl flex items-center justify-center text-yellow-700">[Heatmap]</div>
      </div>
      <div className="bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-md p-6 flex flex-col items-center">
        <div className="text-lg font-semibold mb-2">Terminals by Status</div>
        <div className="w-full h-32 bg-gradient-to-r from-green-200 to-green-400 rounded-xl flex items-center justify-center text-green-700">[Pie Chart]</div>
      </div>
    </div>
  );
}; 