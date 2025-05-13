
import { Card } from "@/components/ui/card";
import { Home, CreditCard, Banknote } from "lucide-react";

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard 
        title="Total Revenue" 
        value="د.إ0"
        icon={<Home className="h-6 w-6 text-white opacity-80" />} 
      />
      <StatCard 
        title="Payments Processed" 
        value="0"
        icon={<CreditCard className="h-6 w-6 text-white opacity-80" />} 
      />
      <StatCard 
        title="Payout Received" 
        value="د.إ0"
        icon={<Banknote className="h-6 w-6 text-white opacity-80" />} 
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card className="bg-gray-900 dark:bg-gray-800 text-white p-5 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-300 mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className="bg-primary/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};
