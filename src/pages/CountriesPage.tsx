import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info, Plus, Settings } from "lucide-react";

// --- Mock Data ---
const allServices = [
  { key: "POS", label: "POS Terminal" },
  { key: "SoftPOS", label: "SoftPOS" },
  { key: "Gateway", label: "Payment Gateway" },
  { key: "ECommerce", label: "E-commerce" },
  { key: "Loans", label: "Loans" },
];
const allCountries = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", region: "Middle East" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", region: "Asia" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", region: "Americas" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", region: "Europe" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", region: "Middle East" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP", region: "Africa" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", region: "Africa" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", currency: "RWF", region: "Africa" },
  { code: "UG", name: "Uganda", flag: "🇺🇬", currency: "UGX", region: "Africa" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", region: "Africa" },
  { code: "MW", name: "Malawi", flag: "🇲🇼", currency: "MWK", region: "Africa" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", currency: "KWD", region: "Middle East" },
];

const initialCountries = [
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    region: "Middle East",
    services: ["POS", "Gateway"],
    status: true,
    tax: 5,
    billing: 2.5,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    region: "Middle East",
    services: ["POS", "SoftPOS", "Gateway"],
    status: true,
    tax: 5,
    billing: 2.0,
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    currency: "EGP",
    region: "Africa",
    services: ["POS", "ECommerce"],
    status: false,
    tax: 0,
    billing: 1.5,
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    currency: "ZAR",
    region: "Africa",
    services: ["POS", "Loans"],
    status: true,
    tax: 15,
    billing: 2.2,
  },
  {
    code: "RW",
    name: "Rwanda",
    flag: "🇷🇼",
    currency: "RWF",
    region: "Africa",
    services: ["POS"],
    status: false,
    tax: 0,
    billing: 0,
  },
  {
    code: "UG",
    name: "Uganda",
    flag: "🇺🇬",
    currency: "UGX",
    region: "Africa",
    services: ["POS", "SoftPOS"],
    status: true,
    tax: 0,
    billing: 1.0,
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    currency: "KES",
    region: "Africa",
    services: ["POS", "Gateway", "ECommerce"],
    status: true,
    tax: 0,
    billing: 1.8,
  },
  {
    code: "MW",
    name: "Malawi",
    flag: "🇲🇼",
    currency: "MWK",
    region: "Africa",
    services: ["POS"],
    status: false,
    tax: 0,
    billing: 0,
  },
  {
    code: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    currency: "KWD",
    region: "Middle East",
    services: ["POS", "Gateway"],
    status: true,
    tax: 5,
    billing: 2.3,
  },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function CountriesPage() {
  const [countries, setCountries] = useState(initialCountries);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);

  // --- Filtering ---
  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesService =
      serviceFilter === "all" || c.services.includes(serviceFilter);
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "active" ? c.status : !c.status);
    return matchesSearch && matchesService && matchesStatus;
  });

  // --- Handlers ---
  const openAdd = () => {
    setEditingCountry(null);
    setSheetOpen(true);
  };
  const openEdit = (country) => {
    setEditingCountry(country);
    setSheetOpen(true);
  };
  const handleSave = (data) => {
    if (editingCountry) {
      setCountries((prev) =>
        prev.map((c) => (c.code === editingCountry.code ? { ...c, ...data } : c))
      );
    } else {
      setCountries((prev) => [...prev, { ...data, code: data.code }]);
    }
    setSheetOpen(false);
  };
  const handleStatusToggle = (code) => {
    setCountries((prev) =>
      prev.map((c) => (c.code === code ? { ...c, status: !c.status } : c))
    );
  };

  // --- Render ---
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Country Management</h1>
            <p className="text-muted-foreground mt-1">
              View and configure the countries where your business operates.
            </p>
          </div>
          <Button onClick={openAdd} className="gap-2" size="sm">
            <Plus className="h-4 w-4" /> Add Country
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap gap-4 items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-0 shadow-xl rounded-2xl p-4">
          <Input
            placeholder="Search by country name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Service Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {allServices.map((s) => (
                <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table or Empty State */}
        {filteredCountries.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border-0 transition-all">
            <span className="text-5xl mb-4">🌍</span>
            <p className="text-lg font-semibold mb-2">You haven't added any countries yet.</p>
            <p className="text-muted-foreground mb-4">Start by adding your first country to enable services.</p>
            <Button onClick={openAdd} className="gap-2" size="sm">
              <Plus className="h-4 w-4" /> Add your first country
            </Button>
          </div>
        ) : (
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-4 rounded-2xl shadow-xl border-0 transition-all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flag</TableHead>
                  <TableHead>Country Name</TableHead>
                  <TableHead>Services Enabled</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.code}>
                    <TableCell className="text-xl">{country.flag}</TableCell>
                    <TableCell>{country.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {country.services.map((s) => {
                          const label = allServices.find((x) => x.key === s)?.label || s;
                          return (
                            <span key={s} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-medium">{label}</span>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>{country.currency}</TableCell>
                    <TableCell>
                      <Switch checked={country.status} onCheckedChange={() => handleStatusToggle(country.code)} />
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEdit(country)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Configure</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Add/Edit Country Side Panel */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right" className="max-w-md w-full">
            <SheetHeader>
              <SheetTitle>{editingCountry ? "Configure Country" : "Add Country"}</SheetTitle>
            </SheetHeader>
            <CountryForm
              allCountries={allCountries}
              allServices={allServices}
              initial={editingCountry}
              onSave={handleSave}
              onCancel={() => setSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}

// --- Country Form Component ---
function CountryForm({ allCountries, allServices, initial, onSave, onCancel }) {
  const [countryCode, setCountryCode] = useState(initial?.code || "");
  const [currency, setCurrency] = useState(initial?.currency || "");
  const [services, setServices] = useState(initial?.services || []);
  const [tax, setTax] = useState(initial?.tax || "");
  const [billing, setBilling] = useState(initial?.billing || "");
  const [status, setStatus] = useState(initial?.status ?? true);

  // Autofill currency when country changes
  const handleCountryChange = (code) => {
    setCountryCode(code);
    const found = allCountries.find((c) => c.code === code);
    if (found) setCurrency(found.currency);
  };

  const handleServiceToggle = (key) => {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = allCountries.find((c) => c.code === countryCode);
    if (!found) return;
    onSave({
      code: countryCode,
      name: found.name,
      flag: found.flag,
      currency,
      region: found.region,
      services,
      status,
      tax,
      billing,
    });
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {allCountries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="mr-2">{c.flag}</span> {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <Input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="Currency" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Services to Enable</label>
        <div className="flex flex-col gap-2">
          {allServices.map((s) => (
            <label key={s.key} className="flex items-center gap-2 text-sm">
              <Checkbox checked={services.includes(s.key)} onCheckedChange={() => handleServiceToggle(s.key)} />
              {s.label}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1 text-muted-foreground cursor-pointer"><Info className="h-3 w-3" /></span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {`Enabling ${s.label} in this country allows you to activate devices/services.`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tax/VAT (%) <span className="text-xs text-muted-foreground">(optional)</span></label>
        <Input type="number" value={tax} onChange={(e) => setTax(e.target.value)} placeholder="e.g. 5" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Billing Configuration <span className="text-xs text-muted-foreground">(optional, % fee)</span></label>
        <Input type="number" value={billing} onChange={(e) => setBilling(e.target.value)} placeholder="e.g. 2.5" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={status} onCheckedChange={setStatus} />
        <span className="text-sm">{status ? "Active" : "Inactive"}</span>
      </div>
      <SheetFooter>
        <Button type="submit" className="w-full">Save</Button>
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full mt-2" onClick={onCancel}>Cancel</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
}
