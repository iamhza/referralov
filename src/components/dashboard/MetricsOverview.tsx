
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import ReferralPipeline from './ReferralPipeline';
import OpenReferrals from './OpenReferrals';
import FeaturedProviderCard from './FeaturedProviderCard';

export const MetricsOverview = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReferralPipeline />
          <OpenReferrals />
        </div>
        <div className="lg:col-span-1">
          <FeaturedProviderCard />
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
