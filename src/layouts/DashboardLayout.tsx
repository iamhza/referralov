
import React, { useState } from 'react';
import { Home, Users, ArrowRight, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { TopNavigation } from '@/components/navigation/TopNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { MessageButton, MessagePanel } from '@/components/messages/MessagePanel';
import { useMessages } from '@/hooks/useMessages';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [showMessages, setShowMessages] = useState(false);
  const { unreadCount } = useMessages();
  
  const menuItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Clients", path: "/clients", icon: Users },
    { title: "Referrals", path: "/referrals", icon: ArrowRight },
    { title: "Analytics", path: "/analytics", icon: BarChart3 },
    { title: "Settings", path: "/settings", icon: Settings },
    { title: "Help & Support", path: "/support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation setShowMessages={setShowMessages} unreadCount={unreadCount} />
      
      {/* Mobile menu button */}
      <MobileNavigation menuItems={menuItems} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Messaging UI */}
      <MessageButton showMessages={showMessages} setShowMessages={setShowMessages} unreadCount={unreadCount} />
      <MessagePanel showMessages={showMessages} setShowMessages={setShowMessages} />
    </div>
  );
};

export default DashboardLayout;
