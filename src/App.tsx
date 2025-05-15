import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentsPage from "./pages/PaymentsPage";
import POSTerminalsPage from "./pages/POSTerminalsPage";
import SoftPOSPage from "./pages/SoftPOSPage";
import ECommercePage from "./pages/ECommercePage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import SettlementsPage from "./pages/SettlementsPage";
import ReportsPage from "./pages/ReportsPage";
import LoanServicesPage from "./pages/LoanServicesPage";
import SettingsPage from "./pages/SettingsPage";
import CustomersPage from "./pages/CustomersPage";
import CountriesPage from "./pages/CountriesPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentButtonPage from "./pages/PaymentButtonPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="app-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/pos-terminals" element={<POSTerminalsPage />} />
            <Route path="/softpos" element={<SoftPOSPage />} />
            <Route path="/e-commerce" element={<ECommercePage />} />
            <Route path="/payment-gateway" element={<PaymentGatewayPage />} />
            <Route path="/settlements" element={<SettlementsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/loan-services" element={<LoanServicesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/payment-button" element={<PaymentButtonPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
