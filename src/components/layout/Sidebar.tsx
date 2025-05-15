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
  Settings,
  ChevronLeft,
  Users,
  Map
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
          className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
      )}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100%-4rem)] z-40 flex flex-col transition-all duration-300",
          "backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-r border-gray-200 dark:border-gray-800 shadow-xl",
          "rounded-r-3xl m-2",
          isMobile
            ? open
              ? "w-64"
              : "-left-80 w-64"
            : open
            ? "w-64"
            : "w-20 min-w-[5rem]"
        )}
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
      >
        <div className="flex flex-col flex-grow h-full overflow-y-auto py-6 gap-2">
          <SidebarNavItem Icon={LayoutDashboard} to="/" label="Dashboard" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={CreditCard} to="/payments" label="Payments" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Printer} to="/pos-terminals" label="POS Terminals" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Smartphone} to="/softpos" label="SoftPOS (Mobile)" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Globe} to="/e-commerce" label="E-commerce" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={CreditCard} to="/payment-gateway" label="Payment Gateway" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Banknote} to="/payment-button" label="Payment Button" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Banknote} to="/settlements" label="Settlements" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={ChartBar} to="/reports" label="Reports & Analytics" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={DollarSign} to="/loan-services" label="Loan Services" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Users} to="/customers" label="Customers" expanded={open} onClick={handleItemClick} />
          <SidebarNavItem Icon={Map} to="/countries" label="Countries" expanded={open} onClick={handleItemClick} />
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <SidebarNavItem Icon={Settings} to="/settings" label="Settings" expanded={open} onClick={handleItemClick} />
          </div>
          {/* Collapse button at the bottom */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(!open)}
              className={cn(
                "mt-4 mb-2 self-center bg-white/80 dark:bg-gray-800/80 rounded-full p-1 border shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-50",
                open ? "rotate-180" : ""
              )}
              style={{ boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </Button>
          )}
        </div>
      </aside>
    </>
  );
};

interface SidebarNavItemProps {
  Icon: React.ElementType;
  to: string;
  label: string;
  expanded: boolean;
  onClick: () => void;
}

const SidebarNavItem = ({ Icon, to, label, expanded, onClick }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
          "hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-md",
          isActive ? "bg-primary/20 text-primary shadow-lg" : "text-gray-700 dark:text-gray-200",
          !expanded && "justify-center px-0"
        )
      }
      onClick={onClick}
      style={{ minHeight: 48 }}
    >
      <Icon size={22} className="shrink-0" />
      {expanded && <span className="truncate" style={{ transition: 'opacity 0.2s' }}>{label}</span>}
    </NavLink>
  );
};
