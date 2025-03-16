
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReferralPipeline from './ReferralPipeline';
import OpenReferrals from './OpenReferrals';
import FeaturedProviderCard from './FeaturedProviderCard';

export const MetricsOverview = () => {
  // Get user name from context or state in a real app
  const userName = "Casey";
  
  // Key metrics for the dashboard header
  const keyMetrics = [
    { label: 'Active Referrals', value: 24, icon: <Users className="h-5 w-5 text-blue-500" /> },
    { label: 'Pending Matches', value: 8, icon: <Clock className="h-5 w-5 text-amber-500" /> },
    { label: 'Urgent Actions', value: 5, icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Google-style Clean & Focused Header */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-8 mt-4">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}</h1>
            <p className="text-gray-600 mt-1 mb-6">What would you like to do today?</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
              <Button 
                className="bg-referra-500 hover:bg-referra-600 text-white shadow-sm flex-1 h-12 text-base" 
                asChild
              >
                <Link to="/new-referral">
                  New Referral Request
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 h-12 text-base"
                asChild
              >
                <Link to="/pending-matches">
                  View Pending Referrals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Key Metrics (Only 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-full">{metric.icon}</div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/${metric.label.toLowerCase().replace(' ', '-')}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          
          {/* Optional Search Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Find client or referral..."
                className="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-referra-400 focus:border-transparent"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Referral Pipeline */}
      <ReferralPipeline />
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OpenReferrals />
        </div>
        
        {/* Right Sidebar - Smart Monetization */}
        <div className="lg:col-span-1">
          <FeaturedProviderCard />
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
