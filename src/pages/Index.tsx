
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ClientTable from '@/components/dashboard/ClientTable';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="page-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 mt-1">Last updated 24 minutes ago</p>
          </div>
          <Button className="bg-referra-500 hover:bg-referra-600 transition-colors" asChild>
            <Link to="/new-referral">
              <Plus className="h-4 w-4 mr-2" />
              <span>New Referral Request</span>
            </Link>
          </Button>
        </div>
        
        {/* Metrics Overview */}
        <div className="mb-8">
          <MetricsOverview />
        </div>
        
        {/* Program Overview Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Program Overview</h2>
            <Button variant="ghost" size="sm" className="text-referra-600" asChild>
              <Link to="/program">
                <span>View details</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-referra-100 flex items-center justify-center mr-2">
                    <ArrowRight className="h-4 w-4 text-referra-600" />
                  </div>
                  Referral Completion
                </CardTitle>
                <CardDescription>92 / 100 referrals completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-referra-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>92%</span>
                    <span>8 remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  Provider Compliance
                </CardTitle>
                <CardDescription>47 / 55 providers compliant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>87%</span>
                    <span>8 non-compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  Process Time
                </CardTitle>
                <CardDescription>28 / 30 within timeframe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>64%</span>
                    <span>2 delayed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tabbed Content for Cleaner Organization */}
        <div className="mb-6">
          <Tabs defaultValue="clients" className="w-full">
            <TabsList className="mb-6 bg-transparent p-0 justify-start space-x-6 border-b w-full rounded-none h-auto">
              <TabsTrigger 
                value="clients" 
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-referra-600 data-[state=active]:border-b-2 data-[state=active]:border-referra-500 rounded-none pb-2"
              >
                Client Overview
              </TabsTrigger>
              <TabsTrigger 
                value="pipeline" 
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-referra-600 data-[state=active]:border-b-2 data-[state=active]:border-referra-500 rounded-none pb-2"
              >
                Referral Pipeline
              </TabsTrigger>
              <TabsTrigger 
                value="providers" 
                className="text-base data-[state=active]:bg-transparent data-[state=active]:text-referra-600 data-[state=active]:border-b-2 data-[state=active]:border-referra-500 rounded-none pb-2"
              >
                Featured Providers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients" className="mt-0">
              <ClientTable />
            </TabsContent>
            
            <TabsContent value="pipeline" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <ReferralPipeline />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="providers" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <FeaturedProviders />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
