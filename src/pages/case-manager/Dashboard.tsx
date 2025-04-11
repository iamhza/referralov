
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import ActionPanel from '@/components/dashboard/ActionPanel';
import { FeaturedProviders } from '@/components/dashboard/FeaturedProviders';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <DashboardHeader />
        
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsOverview />
          <PriorityMetrics />
          <ReferralPipeline />
        </div>
        
        {/* Open Referrals Section */}
        <OpenReferrals />
        
        {/* Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest referral updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "New provider match found", 
                      description: "Minnesota Care Center matched for mental health referral #4851", 
                      time: "2 hours ago",
                      type: "match"
                    },
                    { 
                      title: "Referral status updated", 
                      description: "Housing support referral #4832 changed to In Progress", 
                      time: "Yesterday",
                      type: "status"
                    },
                    { 
                      title: "New message received", 
                      description: "Message from Northside Family Services regarding referral #4829", 
                      time: "2 days ago",
                      type: "message"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex gap-3 items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'match' 
                          ? 'bg-green-100 text-green-700' 
                          : activity.type === 'status' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {activity.type === 'match' 
                          ? <Users className="h-5 w-5" /> 
                          : activity.type === 'status' 
                          ? <Clock className="h-5 w-5" /> 
                          : <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <ActionPanel />
          </div>
        </div>
        
        {/* Featured Providers */}
        <FeaturedProviders />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// Missing imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, MessageSquare } from 'lucide-react';
