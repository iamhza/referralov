
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ClientTable from '@/components/dashboard/ClientTable';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Case Manager</h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your referrals today</p>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Client Table */}
          <div className="lg:col-span-2">
            <ClientTable />
          </div>
          
          {/* Right Column - Featured Providers */}
          <div>
            <FeaturedProviders />
          </div>
        </div>
        
        {/* Referral Pipeline */}
        <div className="mt-8">
          <ReferralPipeline />
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/referrals" className="inline-flex items-center text-referra-600 hover:text-referra-700">
            <span className="font-medium">View all referrals</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
