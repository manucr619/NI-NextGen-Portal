
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  tooltipText?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  tooltipText,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("card-shadow overflow-hidden", className)}>
      <CardContent className="p-6 card-gradient">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-500">{title}</h3>
              {tooltipText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{tooltipText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="mt-1 flex items-baseline">
              <h2 className="text-2xl font-semibold">{value}</h2>
              {trend && (
                <span
                  className={cn(
                    "ml-2 text-sm",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};
