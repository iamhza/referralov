
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
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PriorityMetrics />
          <MetricsOverview />
          <ActionPanel />
        </div>
        
        <Tabs defaultValue="referrals">
          <TabsList>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>
          <TabsContent value="referrals" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OpenReferrals />
              </div>
              <div>
                <ReferralMetrics />
              </div>
            </div>
            <ReferralPipeline />
          </TabsContent>
          <TabsContent value="providers" className="pt-6">
            <FeaturedProviders />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CaseManagerDashboard;
