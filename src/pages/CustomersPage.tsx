import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import { User, Users, Phone, Mail, Tag, Eye, Download, MessageCircle, Globe, Smartphone, Printer, CreditCard, MapPin, IndianRupee } from "lucide-react";

// --- Mock Data ---
const mockStats = [
  {
    title: "Total Customers",
    value: "1,245",
    icon: <Users className="text-primary" />,
    tooltip: "All unique customers across all channels."
  },
  {
    title: "Active Customers (30d)",
    value: "812",
    icon: <User className="text-green-600" />,
    tooltip: "Customers who transacted in the last 30 days."
  },
  {
    title: "New Customers (This Month)",
    value: "134",
    icon: <User className="text-blue-600" />,
    tooltip: "First-time customers acquired this month."
  },
  {
    title: "Repeat Customers %",
    value: "67%",
    icon: <User className="text-purple-600" />,
    tooltip: "Customers with more than one purchase."
  },
];

const channelIcons = {
  POS: <Printer className="h-4 w-4 text-gray-500" />, // 🖨
  SoftPOS: <Smartphone className="h-4 w-4 text-gray-500" />, // 📱
  Online: <Globe className="h-4 w-4 text-gray-500" />, // 🌐
};

const mockCustomers = [
  {
    id: "CUST-001",
    name: "Amit Sharma",
    phone: "+91 98765 43210",
    email: "amit.sharma@email.com",
    channels: ["POS", "Online"],
    totalTransactions: 12,
    totalSpend: 24500,
    firstSeen: "2024-01-10",
    lastSeen: "2024-06-10",
    tags: ["High Value", "Repeat"],
    segment: "VIP",
    preferredChannel: "POS",
    paymentMethods: ["UPI", "Card"],
    location: "Delhi",
    lifetimeValue: 24500,
    history: [
      { id: "TXN-1001", date: "2024-06-10", amount: 5000, channel: "POS", method: "Card", status: "Completed" },
      { id: "TXN-1000", date: "2024-05-20", amount: 2000, channel: "Online", method: "UPI", status: "Completed" },
    ],
  },
  {
    id: "CUST-002",
    name: "Priya Verma",
    phone: "+91 91234 56789",
    email: "priya.verma@email.com",
    channels: ["SoftPOS"],
    totalTransactions: 3,
    totalSpend: 3200,
    firstSeen: "2024-05-01",
    lastSeen: "2024-06-09",
    tags: ["New"],
    segment: "Regular",
    preferredChannel: "SoftPOS",
    paymentMethods: ["UPI"],
    location: "Mumbai",
    lifetimeValue: 3200,
    history: [
      { id: "TXN-1002", date: "2024-06-09", amount: 1200, channel: "SoftPOS", method: "UPI", status: "Completed" },
    ],
  },
  // ...more mock customers
];

const allTags = ["High Value", "Repeat", "New", "Inactive", "VIP"];
const allSegments = ["All", "VIP", "Regular", "New", "Inactive"];
const allChannels = ["All", "POS", "SoftPOS", "Online"];

// --- Main Page ---
const CustomersPage = () => {
  // Role: 'admin' or 'viewer'
  const [role] = useState<'admin' | 'viewer'>("admin");
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("All");
  const [segment, setSegment] = useState("All");
  const [tag, setTag] = useState("All");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Filtered customers (simple mock logic)
  const filteredCustomers = mockCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = channel === "All" || c.channels.includes(channel);
    const matchesSegment = segment === "All" || c.segment === segment;
    const matchesTag = tag === "All" || c.tags.includes(tag);
    return matchesSearch && matchesChannel && matchesSegment && matchesTag;
  });

  // --- Render ---
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header & Metrics */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all your customers across POS, SoftPOS, Online, and Lending channels.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              tooltipText={stat.tooltip}
            />
          ))}
        </div>

        {/* Filters & Search */}
        <Card className="p-4 flex flex-wrap gap-4 items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
          <Input
            placeholder="Search by name, phone, email, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Channel" /></SelectTrigger>
            <SelectContent>
              {allChannels.map((ch) => (
                <SelectItem key={ch} value={ch}>{ch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Segment" /></SelectTrigger>
            <SelectContent>
              {allSegments.map((seg) => (
                <SelectItem key={seg} value={seg}>{seg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Tag" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tags</SelectItem>
              {allTags.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Calendar
              mode="range"
              selected={typeof dateRange.from !== 'undefined' ? { from: dateRange.from, to: dateRange.to } : undefined}
              onSelect={setDateRange}
            />
            <span className="text-xs text-muted-foreground">First/Last Visit</span>
          </div>
          {role === "admin" && (
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> CSV</Button>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Excel</Button>
            </div>
          )}
        </Card>

        {/* Tabs for Channel/Segment */}
        <Tabs value={channel} onValueChange={setChannel}>
          <TabsList>
            {allChannels.map((ch) => (
              <TabsTrigger key={ch} value={ch}>{ch}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Customer Table */}
        <div className="rounded-2xl border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-white/40 dark:bg-gray-900/40">
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Phone / Email</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead>Total Txns</TableHead>
                  <TableHead>Total Spend (₹)</TableHead>
                  <TableHead>First Seen</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((c) => (
                  <TableRow key={c.id} className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
                    <TableCell className="font-medium text-gray-900 dark:text-white">{c.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {c.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {c.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {c.channels.map((ch: string) => (
                          <TooltipProvider key={ch}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>{channelIcons[ch]}</span>
                              </TooltipTrigger>
                              <TooltipContent>{ch}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{c.totalTransactions}</TableCell>
                    <TableCell>₹{c.totalSpend.toLocaleString()}</TableCell>
                    <TableCell>{c.firstSeen}</TableCell>
                    <TableCell>{c.lastSeen}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t: string) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedCustomer(c); setShowProfile(true); }}>
                        <Eye className="h-4 w-4 mr-1" /> View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">No customers found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Customer Profile Slide-In */}
        <Sheet open={showProfile} onOpenChange={setShowProfile}>
          <SheetContent side="right" className="max-w-md w-full">
            <SheetHeader>
              <SheetTitle>Customer Profile</SheetTitle>
              <SheetDescription>
                {selectedCustomer?.name} ({selectedCustomer?.id})
              </SheetDescription>
            </SheetHeader>
            {selectedCustomer && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-bold text-lg">{selectedCustomer.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedCustomer.email}</div>
                    <div className="text-xs text-muted-foreground">{selectedCustomer.phone}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedCustomer.segment}</Badge>
                  {selectedCustomer.tags.map((t: string) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">{selectedCustomer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Preferred Channel:</span>
                  {channelIcons[selectedCustomer.preferredChannel]}
                  <span className="text-xs">{selectedCustomer.preferredChannel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Payment Methods:</span>
                  {selectedCustomer.paymentMethods.map((pm: string) => (
                    <Badge key={pm} variant="secondary" className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {pm}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Lifetime Value:</span>
                  <Badge variant="outline" className="text-lg"><IndianRupee className="h-4 w-4 inline" /> {selectedCustomer.lifetimeValue.toLocaleString()}</Badge>
                </div>
                {/* Purchase History */}
                <div>
                  <div className="font-semibold mb-2">Purchase History</div>
                  <div className="max-h-40 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Channel</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCustomer.history.map((txn: any) => (
                          <TableRow key={txn.id}>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                            <TableCell>{channelIcons[txn.channel]}</TableCell>
                            <TableCell>{txn.method}</TableCell>
                            <TableCell>{txn.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm"><MessageCircle className="h-4 w-4 mr-1" /> Send Message</Button>
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export Summary</Button>
                </div>
              </div>
            )}
            <SheetClose asChild>
              <Button variant="ghost" className="absolute top-2 right-2">Close</Button>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {/* Segmentation + Tags Panel (Admin Only) */}
        {role === "admin" && (
          <Card className="p-4 mt-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
            <div className="font-semibold mb-2 flex items-center gap-2"><Tag className="h-4 w-4" /> Segmentation & Tags</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {allTags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
              <Button size="sm" variant="outline" className="ml-2">+ Create Tag</Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Bulk Assign</Button>
              <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" /> Download CSV</Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
