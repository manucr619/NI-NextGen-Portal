
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
    <Card className="bg-gray-900 dark:bg-gray-800 text-white p-5 rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-5xl font-bold mb-2">{value}</h3>
        <p className="text-sm text-gray-300">{title.toLowerCase()}</p>
        <div className="w-36 h-36 mt-4 rounded-full border-8 border-gray-700 dark:border-gray-600 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl font-bold">{value}</span>
            <p className="text-xs text-gray-400">{title.toLowerCase()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const RevenueByProduct = () => {
  return (
    <Card className="bg-gray-900 dark:bg-gray-800 text-white p-5 rounded-lg shadow-md col-span-1">
      <h3 className="text-lg font-medium mb-3">Revenue Split by Product type</h3>
      <div className="h-64 flex items-center justify-center">
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
