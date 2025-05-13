import { Card } from "@/components/ui/card";

export const CountriesMap = () => {
  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl mb-6 border-0 transition-all"
      style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <h3 className="text-lg font-semibold mb-5">Top 5 Revenue Generating Countries</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-48 bg-white/60 dark:bg-gray-800/60 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-800">
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
    <div className="flex justify-between items-center px-2 py-2 rounded-lg bg-white/40 dark:bg-gray-800/40 shadow-sm">
      <div className="flex items-center">
        <span className="mr-2 text-xl">{flag}</span>
        <span className="font-medium text-gray-800 dark:text-gray-100">{name}</span>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
          <div className="w-0 h-full bg-blue-500 rounded-full"></div>
        </div>
        <span className="font-semibold text-gray-700 dark:text-gray-200">{value}</span>
      </div>
    </div>
  );
};

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "France", flag: "🇫🇷" },
  { name: "India", flag: "🇮🇳" },
  { name: "UAE", flag: "🇦🇪" },
];
