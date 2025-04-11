
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import ActionPanel from '@/components/dashboard/ActionPanel';
import ReferralMetrics from '@/components/dashboard/ReferralMetrics';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';

const CaseManagerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
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
        
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Priority Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityMetrics />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricsOverview />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ActionPanel />
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
                    <CardTitle className="text-lg">Open Referrals</CardTitle>
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
