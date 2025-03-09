
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ClientTable from '@/components/dashboard/ClientTable';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        {/* Top metrics overview section */}
        <MetricsOverview />
        
        {/* Tabbed content section */}
        <div className="max-w-7xl mx-auto mt-8">
          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 bg-white shadow-md rounded-lg p-1">
              <TabsTrigger 
                value="pipeline" 
                className="data-[state=active]:bg-referra-50 data-[state=active]:text-referra-600 py-3"
              >
                Referral Pipeline
              </TabsTrigger>
              <TabsTrigger 
                value="clients" 
                className="data-[state=active]:bg-referra-50 data-[state=active]:text-referra-600 py-3"
              >
                Active Clients
              </TabsTrigger>
              <TabsTrigger 
                value="providers" 
                className="data-[state=active]:bg-referra-50 data-[state=active]:text-referra-600 py-3"
              >
                Featured Providers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pipeline" className="mt-0">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <ReferralPipeline />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clients" className="mt-0">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <ClientTable />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="providers" className="mt-0">
              <Card className="border-none shadow-md">
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
