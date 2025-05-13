import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  filterOptions?: string[];
  onFilterChange?: (value: string) => void;
  className?: string;
}

export const ChartCard = ({ 
  title, 
  children, 
  filterOptions = ["Last 7 days", "This month", "Last month", "Custom range"],
  onFilterChange,
  className
}: ChartCardProps) => {
  return (
    <Card
      className={`overflow-hidden border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl h-full transition-all ${className || ''}`}
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</CardTitle>
        {filterOptions && (
          <Select defaultValue={filterOptions[0]} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[160px] h-8 text-xs bg-white/60 dark:bg-gray-800/60 border-0 shadow rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg">
              {filterOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-xs">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        {children}
      </CardContent>
    </Card>
  );
};
