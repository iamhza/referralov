
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import MetricsOverview from '@/components/dashboard/MetricsOverview';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <MetricsOverview />
      </div>
    </DashboardLayout>
  );
};

export default Index;
