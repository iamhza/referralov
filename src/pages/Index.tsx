
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ClientTable from '@/components/dashboard/ClientTable';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Metrics Overview with new layout */}
        <div className="mb-8">
          <MetricsOverview />
        </div>
        
        {/* Tabbed Content */}
        <div className="mb-6">
          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 bg-white shadow-sm rounded-lg p-1">
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
              <Card className="border shadow-sm">
                <CardContent className="p-0">
                  <ReferralPipeline />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clients" className="mt-0">
              <Card className="border shadow-sm">
                <CardContent className="p-0">
                  <ClientTable />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="providers" className="mt-0">
              <Card className="border shadow-sm">
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
