import { Bell, Settings, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 md:px-8 sticky top-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200,200,200,0.25)',
        borderRadius: '0 0 2rem 2rem',
        boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.08)',
      }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-6 w-6">
            <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
        <img
          src="https://www.network.ae/newfrontend/images/logo.svg"
          alt="Company Logo"
          className="h-8 mr-2 drop-shadow-sm"
        />
        <div className="hidden md:flex items-center gap-2">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Hello, Manu</h2>
          <Button variant="ghost" size="sm">
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <NotificationItem
                title="Payment Received"
                description="You received 15,000 from Customer XYZ"
                time="2 hours ago"
              />
              <NotificationItem
                title="KYC Reminder"
                description="Please complete your KYC verification"
                time="1 day ago"
                important
              />
              <NotificationItem
                title="New Feature Available"
                description="Try our new SoftPOS mobile application"
                time="3 days ago"
              />
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>MN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Merchant Name</p>
                <p className="text-xs leading-none text-muted-foreground">
                  merchant@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/")}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  important?: boolean;
}

const NotificationItem = ({ title, description, time, important }: NotificationItemProps) => (
  <div className={`p-3 hover:bg-muted/50 cursor-pointer rounded-lg ${important ? 'border-l-2 border-secondary' : ''}`}>
    <div className="flex justify-between">
      <p className="text-sm font-medium">{title}</p>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);
