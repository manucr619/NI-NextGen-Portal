
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DataItem {
  name: string;
  POS: number;
  SoftPOS: number;
  Online: number;
}

const initialData: DataItem[] = [
  { name: 'Jan', POS: 4000, SoftPOS: 2400, Online: 6000 },
  { name: 'Feb', POS: 3000, SoftPOS: 2800, Online: 5500 },
  { name: 'Mar', POS: 2000, SoftPOS: 3200, Online: 6800 },
  { name: 'Apr', POS: 2780, SoftPOS: 3908, Online: 7500 },
  { name: 'May', POS: 1890, SoftPOS: 4800, Online: 8200 },
];

export const ChannelComparisonChart = () => {
  const [data] = useState<DataItem[]>(initialData);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
            cursor={{ fillOpacity: 0.1 }}
          />
          <Legend />
          <Bar dataKey="POS" fill="#0069B1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="SoftPOS" fill="#36A2EB" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Online" fill="#4BC0C0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
