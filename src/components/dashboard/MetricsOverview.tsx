
import React from 'react';
import { ArrowRight, Clock, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const MetricCard = ({ title, value, icon, description, trend, className }: MetricCardProps) => (
  <div className={cn(
    "bg-white rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md", 
    className
  )}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-xl font-bold mt-1">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-1">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
      <div className="p-2 rounded-lg bg-gray-50">
        {icon}
      </div>
    </div>
  </div>
);

export const MetricsOverview = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Referrals"
        value="24"
        description="12 in progress, 4 pending"
        icon={<ArrowRight className="h-5 w-5 text-referra-500" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Pending Matches"
        value="8"
        description="Awaiting provider selection"
        icon={<Clock className="h-5 w-5 text-amber-500" />}
        trend={{ value: 3, isPositive: false }}
      />
      <MetricCard
        title="Completed Referrals"
        value="186"
        description="Last 30 days: 42"
        icon={<Check className="h-5 w-5 text-green-500" />}
        trend={{ value: 8, isPositive: true }}
      />
      <MetricCard
        title="Urgent Actions"
        value="5"
        description="Requires your attention"
        icon={<AlertCircle className="h-5 w-5 text-red-500" />}
        className="border-l-4 border-red-500"
      />
    </div>
  );
};

export default MetricsOverview;
