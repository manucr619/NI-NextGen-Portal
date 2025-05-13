
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CreditCard, 
  Printer, 
  Smartphone, 
  Globe, 
  Banknote, 
  ChartBar, 
  DollarSign, 
  FileText, 
  Receipt, 
  Settings, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const handleItemClick = () => {
    if (isMobile && open) {
      onOpenChange(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      <aside
        className={cn(
          "bg-sidebar h-[calc(100vh-4rem)] z-30 flex flex-col border-r transition-all duration-300",
          isMobile 
            ? open 
              ? "fixed left-0 w-64" 
              : "fixed -left-64 w-64"
            : open
              ? "w-64" 
              : "w-20"
        )}
      >
        {!isMobile && (
          <Button 
            variant="ghost"
            size="sm" 
            onClick={() => onOpenChange(!open)} 
            className={cn(
              "absolute -right-3 top-6 bg-white rounded-full p-1 border shadow-md hover:bg-gray-100",
              open ? "rotate-180" : ""
            )}
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </Button>
        )}
        
        <div className="flex flex-col flex-grow overflow-y-auto py-4">
          <NavItem Icon={LayoutDashboard} to="/" label="Dashboard" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={CreditCard} to="/payments" label="Payments" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={Printer} to="/pos-terminals" label="POS Terminals" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={Smartphone} to="/softpos" label="SoftPOS (Mobile)" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={Globe} to="/e-commerce" label="E-commerce" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={CreditCard} to="/payment-gateway" label="Payment Gateway" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={Banknote} to="/settlements" label="Settlements" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={ChartBar} to="/reports" label="Reports & Analytics" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={DollarSign} to="/loan-services" label="Loan Services" expanded={open} onClick={handleItemClick} />
          <NavItem Icon={FileText} to="/digital-onboarding" label="Digital Onboarding" expanded={open} onClick={handleItemClick} />
          
          <div className="mt-auto">
            <NavItem Icon={Settings} to="/settings" label="Settings" expanded={open} onClick={handleItemClick} />
          </div>
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  Icon: React.ElementType;
  to: string;
  label: string;
  expanded: boolean;
  onClick: () => void;
}

const NavItem = ({ Icon, to, label, expanded, onClick }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "sidebar-link",
          isActive ? "active" : "",
          !expanded && "justify-center px-0"
        )
      }
      onClick={onClick}
    >
      <Icon size={20} />
      {expanded && <span className="truncate">{label}</span>}
    </NavLink>
  );
};
