import { Card } from "@/components/ui/card";

export const CounterCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <CounterCard 
        title="Customers" 
        value="0"
      />
      
      <RevenueByProduct />
      
      <CounterCard 
        title="Transactions" 
        value="0"
      />
    </div>
  );
};

interface CounterCardProps {
  title: string;
  value: string;
}

const CounterCard = ({ title, value }: CounterCardProps) => {
  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center h-full border-0 transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <h3 className="text-5xl font-bold mb-2">{value}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{title.toLowerCase()}</p>
      <div className="w-28 h-28 mt-2 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white/40 dark:bg-gray-800/40">
        <span className="text-3xl font-bold text-gray-700 dark:text-gray-200">{value}</span>
      </div>
    </Card>
  );
};

const RevenueByProduct = () => {
  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl col-span-1 border-0 transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <h3 className="text-lg font-semibold mb-3">Revenue Split by Product type</h3>
      <div className="h-40 flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
      <div className="flex justify-center mt-2 space-x-4">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-xs">OneTime</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs">Subscription</span>
        </div>
      </div>
    </Card>
  );
};
