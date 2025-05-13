import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100/80 via-white/80 to-blue-50/60 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 transition-colors duration-300">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <Sidebar open={isMobile ? sidebarOpen : true} onOpenChange={setSidebarOpen} />
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300",
            isMobile ? "w-full" : (sidebarOpen ? "md:ml-64" : "md:ml-20"),
            "max-w-full mx-auto min-h-[calc(100vh-4rem)]"
          )}
          style={{
            borderRadius: '2rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
