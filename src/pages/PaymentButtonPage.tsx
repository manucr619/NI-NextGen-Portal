import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { DashboardLayout } from "../components/layout/DashboardLayout";

const paymentButtons = [
  {
    title: "St Marys Jacobite Syrian Church",
    totalSales: "₹ 0.00",
    itemName: "Donate an Amount",
    unitsSold: 0,
    createdAt: "08 Aug 2020, 01:09:51 pm",
    status: "Active",
    actions: "Get Button Code",
  },
];

const buttonTypes = [
  {
    title: "Quick-Pay Button",
    desc: "Accepting fixed price payments? Customers make quick payments of fixed price through this button.",
    cta: "Pay Now",
    color: "bg-blue-100",
  },
  {
    title: "Donations Button",
    desc: "Raising money for a good cause? Supporters can pick from presets or donate amount of their choice.",
    cta: "Donate Now",
    color: "bg-purple-100",
  },
  {
    title: "Buy Now Button",
    desc: "Selling products or event tickets? Sell multiple items with support for quantity using this button.",
    cta: "Buy Now",
    color: "bg-yellow-100",
  },
  {
    title: "Custom Button",
    desc: "Experience full capabilities of buttons with multiple amounts, custom information forms, etc. Intended for power users.",
    cta: "Custom",
    color: "bg-gray-100",
  },
];

const PaymentButtonPage = () => {
  const [status, setStatus] = useState("All");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(25);

  return (
    <DashboardLayout>
      {/* Stepper */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">GET STARTED</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-2xl">1</span>
            </div>
            <div className="font-semibold">Create a Button</div>
            <div className="text-sm text-muted-foreground text-center">Start by creating a Payment Button to collect online payments or donations.</div>
          </div>
          <div className="hidden md:block w-12 h-1 bg-muted rounded mx-2" />
          <div className="flex-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <span className="text-2xl">2</span>
            </div>
            <div className="font-semibold">Copy and Paste the Code</div>
            <div className="text-sm text-muted-foreground text-center">Get a single line code that you put on your website or blog to enable online payments.</div>
          </div>
          <div className="hidden md:block w-12 h-1 bg-muted rounded mx-2" />
          <div className="flex-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-2xl">3</span>
            </div>
            <div className="font-semibold">Receive Payments</div>
            <div className="text-sm text-muted-foreground text-center">Customers and supporters will use this button to make payments on your website or blog.</div>
          </div>
        </div>
      </div>

      {/* Tabs and Table Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs defaultValue="payment" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="payment">Payment Buttons</TabsTrigger>
              <TabsTrigger value="subscription">Subscription Buttons</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button>Need help? Take a tour</Button>
              <Button variant="outline">Documentation</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white">+ Create Payment Button</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <h2 className="text-2xl font-bold mb-6 text-primary text-center">Pick a Button Type</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {buttonTypes.map((type, idx) => {
                      // Pick an emoji or icon for each type
                      const icons = [
                        "💸", // Quick-Pay
                        "❤️", // Donations
                        "🛒", // Buy Now
                        "⚙️", // Custom
                      ];
                      return (
                        <Card key={idx} className="hover:shadow-xl transition-shadow cursor-pointer group border-2 border-transparent hover:border-primary">
                          <CardHeader className="flex flex-col items-center justify-center">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl shadow-lg ${type.color} group-hover:scale-110 transition-transform`}>
                              <span>{icons[idx]}</span>
                            </div>
                            <CardTitle className="text-center text-lg group-hover:text-primary transition-colors">{type.title}</CardTitle>
                            <CardDescription className="text-center mt-2 text-base text-muted-foreground group-hover:text-foreground transition-colors">{type.desc}</CardDescription>
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* Test Mode Alert */}
          <Alert className="mb-4">
            <AlertTitle>You are in <span className="font-bold">Test Mode</span></AlertTitle>
            <AlertDescription>
              Only test data is shown. <a href="#" className="underline text-primary">Activate your account</a> to start making live transactions.
            </AlertDescription>
          </Alert>
          {/* Search/Filter Bar */}
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="w-40">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                placeholder="Count"
              />
            </div>
            <Button>Search</Button>
            <Button variant="outline">Clear</Button>
          </div>
          {/* Table */}
          <TabsContent value="payment">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentButtons.map((btn, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <a href="#" className="text-primary underline">{btn.title}</a>
                    </TableCell>
                    <TableCell>{btn.totalSales}</TableCell>
                    <TableCell>{btn.itemName}</TableCell>
                    <TableCell>{btn.unitsSold}</TableCell>
                    <TableCell>{btn.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant={btn.status === "Active" ? "default" : "secondary"}>{btn.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" className="p-0 h-auto min-w-0">{btn.actions}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-sm text-muted-foreground mt-2">Showing 1 - {paymentButtons.length}</div>
          </TabsContent>
          <TabsContent value="subscription">
            <div className="text-center text-muted-foreground py-8">No subscription buttons found.</div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PaymentButtonPage; 