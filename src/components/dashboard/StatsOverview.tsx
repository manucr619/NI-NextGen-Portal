import { Card } from "@/components/ui/card";
import { Home, CreditCard, Banknote } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Total Revenue"
        value="0"
        icon={<Home className="h-6 w-6 text-primary" />}
      />
      <StatCard
        title="Payments Processed"
        value="0"
        icon={<CreditCard className="h-6 w-6 text-primary" />}
      />
      <StatCard
        title="Payout Received"
        value="0"
        icon={<Banknote className="h-6 w-6 text-primary" />}
      />
    </div>
  );
};
