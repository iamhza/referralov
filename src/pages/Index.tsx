
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import { OpenReferrals } from '@/components/dashboard/OpenReferrals';
import { ReferralPipeline } from '@/components/dashboard/ReferralPipeline';
import { PriorityMetrics } from '@/components/dashboard/PriorityMetrics';
import { ClientTable } from '@/components/dashboard/ClientTable';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { FeaturedProviders } from '@/components/dashboard/FeaturedProviders';
import { ApiTester } from '@/components/ApiTester';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <DashboardHeader />
        
        {/* API Tester Component */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">API Gateway Test</h2>
          <ApiTester />
        </div>
        
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsOverview />
          <PriorityMetrics />
          <ReferralPipeline />
        </div>
        
        {/* Open Referrals Section */}
        <OpenReferrals />
        
        {/* Clients & Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ClientTable />
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

export default Index;
