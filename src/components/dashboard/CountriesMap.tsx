
import { Card } from "@/components/ui/card";

export const CountriesMap = () => {
  return (
    <Card className="bg-gray-900 dark:bg-gray-800 text-white p-5 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-medium mb-5">Top 5 Revenue Generating Countries</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">World map visualization</p>
        </div>
        
        <div className="space-y-3">
          {countries.map((country) => (
            <CountryRow 
              key={country.name}
              flag={country.flag} 
              name={country.name} 
              value="د.إ0k" 
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface CountryRowProps {
  flag: string;
  name: string;
  value: string;
}

const CountryRow = ({ flag, name, value }: CountryRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <span className="mr-2 text-xl">{flag}</span>
        <span>{name}</span>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-2 bg-gray-700 rounded-full mr-2">
          <div className="w-0 h-full bg-blue-500 rounded-full"></div>
        </div>
        <span>{value}</span>
      </div>
    </div>
  );
};

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "France", flag: "🇫🇷" },
  { name: "India", flag: "🇮🇳" },
  { name: "Germany", flag: "🇩🇪" }
];
