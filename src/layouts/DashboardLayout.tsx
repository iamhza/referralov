
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Users, ArrowRight, List, MessageSquare, Calendar, Star } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [showMessages, setShowMessages] = useState(false);

  const menuItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Clients", path: "/clients", icon: Users },
    { title: "Referrals", path: "/referrals", icon: ArrowRight },
    { title: "Providers", path: "/providers", icon: List },
  ];

  // Floating message panel
  const MessageButton = () => (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 animate-fade-in ${showMessages ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
    >
      <button 
        onClick={() => setShowMessages(true)}
        className="bg-referra-500 hover:bg-referra-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Open messages"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );

  const MessagePanel = () => (
    <div 
      className={`fixed bottom-0 right-0 w-full sm:w-96 h-[calc(100vh-5rem)] sm:h-[30rem] bg-white border-l border-t sm:border-t-0 sm:border-l sm:rounded-tl-xl shadow-2xl z-50 transition-all duration-300 ease-in-out ${
        showMessages ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Messages</h2>
        <button 
          onClick={() => setShowMessages(false)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <div className="bg-referra-200 text-referra-800 w-10 h-10 rounded-full flex items-center justify-center">JP</div>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
              <p className="text-sm">Hello! I've received your referral for John Doe. We can schedule an intake next week.</p>
              <span className="text-xs text-gray-500 block mt-1">9:45 AM</span>
            </div>
          </div>
          <div className="flex items-start gap-3 flex-row-reverse">
            <Avatar>
              <div className="bg-teal-200 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center">ME</div>
            </Avatar>
            <div className="bg-referra-100 p-3 rounded-2xl rounded-tr-none">
              <p className="text-sm">Great! The client is available Tuesday or Thursday afternoon. Which works best?</p>
              <span className="text-xs text-gray-500 block mt-1">9:47 AM</span>
            </div>
          </div>
          {/* Additional messages would go here */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <form className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-referra-400"
          />
          <button 
            type="submit"
            className="bg-referra-500 text-white p-2.5 rounded-lg hover:bg-referra-600 transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <div className="p-4">
            <div className="flex items-center gap-2 px-2">
              <div className="bg-referra-500 text-white p-1.5 rounded">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Referra</span>
            </div>
          </div>
          
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild className={cn(
                    location.pathname === item.path && "bg-accent"
                  )}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center gap-3 px-2">
              <Avatar>
                <div className="bg-referra-200 text-referra-800 w-10 h-10 rounded-full flex items-center justify-center">
                  CM
                </div>
              </Avatar>
              <div>
                <div className="font-medium">Case Manager</div>
                <div className="text-xs text-muted-foreground">manager@agency.org</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold hidden sm:block">
                {menuItems.find(item => item.path === location.pathname)?.title || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Calendar className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Star className="h-5 w-5 text-gray-500" />
              </button>
              <button 
                onClick={() => setShowMessages(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
        
        {/* Messaging UI */}
        <MessageButton />
        <MessagePanel />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
