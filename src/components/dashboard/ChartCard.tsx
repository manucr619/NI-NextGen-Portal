
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
  className?: string; // Added className property
}

export const ChartCard = ({ 
  title, 
  children, 
  filterOptions = ["Last 7 days", "This month", "Last month", "Custom range"],
  onFilterChange,
  className
}: ChartCardProps) => {
  return (
    <Card className={`card-shadow h-full ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {filterOptions && (
          <Select defaultValue={filterOptions[0]} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
