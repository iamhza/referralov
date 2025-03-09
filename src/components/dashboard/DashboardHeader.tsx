
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardHeader = () => {
  const hour = new Date().getHours();
  let greeting;
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";
  
  // Get user name from context or state in a real app
  const userName = "Casey";
  
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{greeting}, {userName}</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your referrals today</p>
          </div>
          
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-base font-medium text-gray-900">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
