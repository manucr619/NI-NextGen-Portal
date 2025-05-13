import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
    <Card
      className={cn(
        "overflow-hidden border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl transition-all",
        className
      )}
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
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
            <div className="mt-1 flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>
              {trend && (
                <span
                  className={cn(
                    "text-base font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? '+' : '-'}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 shadow-md flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
