
import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface DataPoint {
  name: string;
  amount: number;
  transactions: number;
}

// Demo data
const generateDemoData = (days: number): DataPoint[] => {
  const data: DataPoint[] = [];
  const today = new Date();
  const baseAmount = 25000;
  const baseTxn = 120;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate some random data that makes sense
    const amountVariation = Math.random() * 15000 - 5000;
    const txnVariation = Math.random() * 40 - 10;
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: Math.round(baseAmount + amountVariation),
      transactions: Math.round(baseTxn + txnVariation)
    });
  }
  
  return data;
};

export const TransactionVolumeChart = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [activeRight, setActiveRight] = useState<boolean>(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setData(generateDemoData(7));
  }, []);
  
  const formatCurrency = (value: number) => `₹${(value/1000).toFixed(1)}K`;
  const formatNumber = (value: number) => value.toFixed(0);
  
  return (
    <div className="h-[300px] w-full">
      <div className="flex justify-end space-x-2 mb-2 text-xs">
        <button
          onClick={() => setActiveRight(false)}
          className={`px-2 py-1 rounded ${!activeRight ? 'bg-primary text-white' : 'bg-gray-100'}`}
        >
          Volume (₹)
        </button>
        <button
          onClick={() => setActiveRight(true)}
          className={`px-2 py-1 rounded ${activeRight ? 'bg-primary text-white' : 'bg-gray-100'}`}
        >
          Transactions
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: isMobile ? 0 : 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatNumber}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === "amount") return [`₹${Number(value).toLocaleString()}`, "Volume"];
              return [value, "Transactions"];
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="amount" 
            stroke="#0069B1" 
            activeDot={{ r: 8 }} 
            name="Volume"
            strokeWidth={2}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="transactions" 
            stroke="#E12E56"
            name="Transactions"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
