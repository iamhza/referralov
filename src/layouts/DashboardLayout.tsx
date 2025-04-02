
import React, { useState } from 'react';
import { Home, Users, ArrowRight, List, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { TopNavigation } from '@/components/navigation/TopNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { MessageButton, MessagePanel } from '@/components/messages/MessagePanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [showMessages, setShowMessages] = useState(false);

  const menuItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Clients", path: "/clients", icon: Users },
    { title: "Referrals", path: "/referrals", icon: ArrowRight },
    // Updated the path for Matched Providers to use the referrals route instead
    { title: "Providers", path: "/referrals", icon: Users },
    { title: "Analytics", path: "/analytics", icon: BarChart3 },
    { title: "Settings", path: "/settings", icon: Settings },
    { title: "Help & Support", path: "/support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation setShowMessages={setShowMessages} />
      
      {/* Mobile menu button */}
      <MobileNavigation menuItems={menuItems} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Messaging UI */}
      <MessageButton showMessages={showMessages} setShowMessages={setShowMessages} />
      <MessagePanel showMessages={showMessages} setShowMessages={setShowMessages} />
    </div>
  );
};

export default DashboardLayout;
