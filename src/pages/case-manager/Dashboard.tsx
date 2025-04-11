
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, PlusCircle, Search, Clock, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';

const CaseManagerDashboard = () => {
  // Placeholder name - in a real app this would come from user context/state
  const userName = "Casey";
  
  return (
    <DashboardLayout>
      <div className="container px-6 py-8 space-y-6 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}</h1>
                <p className="text-gray-500 mt-1">Here's an overview of your referrals</p>
              </div>
              <Button className="bg-referra-500 hover:bg-referra-600" asChild>
                <Link to="/case-manager/new-referral">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Referral
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Top Row - Search & Priority Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search & Stats */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search clients, referrals, or providers..."
                    className="w-full pl-10 h-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-referra-400 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 text-blue-700 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">Active Referrals</p>
                    <p className="text-2xl font-bold mt-1">24</p>
                  </div>
                  <div className="bg-amber-50 text-amber-700 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">Pending Matches</p>
                    <p className="text-2xl font-bold mt-1">8</p>
                  </div>
                  <div className="bg-red-50 text-red-700 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">Needs Attention</p>
                    <p className="text-2xl font-bold mt-1">5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Priority Actions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Priority Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityMetrics />
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Row - Simplified Referral Pipeline */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Referral Pipeline</CardTitle>
            <Button variant="ghost" size="sm" className="text-referra-600 hover:text-referra-800">
              View Details <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <ReferralPipeline />
          </CardContent>
        </Card>
        
        {/* Bottom Content - Tabbed Interface */}
        <Tabs defaultValue="referrals" className="space-y-4">
          <TabsList className="w-full sm:w-auto border-b">
            <TabsTrigger value="referrals" className="text-sm">Active Referrals</TabsTrigger>
            <TabsTrigger value="providers" className="text-sm">Featured Providers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="referrals" className="pt-2">
            <Card className="shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Open Referrals</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/case-manager/referrals" className="text-referra-600 hover:text-referra-800 flex items-center">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <OpenReferrals />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="providers" className="pt-2">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <FeaturedProviders />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CaseManagerDashboard;
