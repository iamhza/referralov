
import React, { useState } from 'react';
import { Home, Users, ArrowRight, List } from 'lucide-react';
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
    { title: "Providers", path: "/providers", icon: List },
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
