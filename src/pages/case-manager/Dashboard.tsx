
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, PlusCircle, Users, Clock, AlertTriangle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import ActionPanel from '@/components/dashboard/ActionPanel';
import ReferralMetrics from '@/components/dashboard/ReferralMetrics';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';
import { Separator } from '@/components/ui/separator';

const CaseManagerDashboard = () => {
  // Placeholder name - in a real app this would come from user context/state
  const userName = "Casey";
  
  // Sample key metrics for display
  const keyMetrics = [
    { 
      label: 'Active Referrals', 
      value: '24', 
      className: 'bg-blue-50 text-blue-700'
    },
    { 
      label: 'Pending Matches', 
      value: '8', 
      className: 'bg-amber-50 text-amber-700'
    },
    { 
      label: 'Needs Attention', 
      value: '5', 
      className: 'bg-red-50 text-red-700' 
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Case Manager Dashboard</h1>
              <p className="text-gray-500">Manage referrals and track service progress</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/case-manager/referrals">
                  View All Referrals
                </Link>
              </Button>
              <Button className="bg-referra-500 hover:bg-referra-600" asChild>
                <Link to="/case-manager/new-referral">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Referral
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priority Actions Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Priority Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityMetrics />
            </CardContent>
          </Card>
          
          {/* Overview Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Welcome back,</h2>
                  <h2 className="text-2xl font-bold text-referra-600">{userName}</h2>
                  <p className="text-gray-600 mt-2">Here's what's happening with your referrals today</p>
                </div>
                
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
                
                <div className="flex justify-between pt-2 gap-4">
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-full inline-block mb-1">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-xs text-gray-500">Active</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-full inline-block mb-1">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-full inline-block mb-1">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="text-xs text-gray-500">Urgent</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-referra-500 hover:bg-referra-600 justify-center" asChild>
                  <Link to="/case-manager/new-referral">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Referral
                  </Link>
                </Button>
                
                <div className="grid grid-cols-3 gap-4">
                  {keyMetrics.map((metric, index) => (
                    <div key={index} className={`${metric.className} rounded-lg p-4 text-center`}>
                      <p className="text-sm font-medium">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Row - Referral Pipeline */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Referral Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ReferralPipeline />
          </CardContent>
        </Card>
        
        {/* Tabbed Content */}
        <Tabs defaultValue="referrals" className="space-y-6">
          <TabsList className="w-full sm:w-auto border-b">
            <TabsTrigger value="referrals" className="text-sm">Active Referrals</TabsTrigger>
            <TabsTrigger value="providers" className="text-sm">Featured Providers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="referrals" className="space-y-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Open Referrals</CardTitle>
                      <Button variant="ghost" size="sm" className="text-referra-600 hover:text-referra-800">
                        View All <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <OpenReferrals />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Referral Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReferralMetrics />
                  </CardContent>
                </Card>
              </div>
            </div>
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
