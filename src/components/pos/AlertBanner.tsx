import React, { useState } from 'react';

export const AlertBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow mb-4">
      <span className="mr-2">&#9888;&#65039;</span>
      <span className="flex-1">2 Terminals require firmware update</span>
      <button className="ml-4 text-yellow-700 hover:text-yellow-900" onClick={() => setVisible(false)}>&times;</button>
    </div>
  );
}; 