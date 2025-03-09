
import React from 'react';
import { ArrowRight, Clock, Check, AlertCircle, Users, User, Flame, AlertTriangle, Zap, FileCheck, UserPlus, RotateCw, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
  variant?: 'default' | 'attention' | 'compliant' | 'warning' | 'neutral';
  onClick?: () => void;
}

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  className,
  variant = 'default',
  onClick
}: MetricCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'attention':
        return 'border-l-4 border-red-500';
      case 'compliant':
        return 'border-l-4 border-green-500';
      case 'warning':
        return 'border-l-4 border-amber-500';
      case 'neutral':
        return 'border-l-4 border-gray-400';
      default:
        return 'border-l-4 border-referra-500';
    }
  };

  return (
    <Card 
      className={cn(
        "bg-white rounded-lg shadow-sm p-5 flex justify-between items-start transition-all duration-300 hover:shadow-md", 
        getVariantStyles(),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-2 rounded-lg bg-gray-50">
        {icon}
      </div>
    </Card>
  );
};

const WelcomeHeader = () => {
  // Get current time for greeting
  const hour = new Date().getHours();
  let greeting;
  
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{greeting}, Case Manager</h1>
          <p className="text-gray-500">Here's what's happening with your referrals today</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

const ActionCTABox = () => {
  return (
    <Card className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="bg-referra-500 hover:bg-referra-600 transition-colors flex-grow h-12 text-base shadow-sm" asChild>
          <Link to="/new-referral">
            <Plus className="h-5 w-5 mr-2" />
            <span>New Referral Request</span>
          </Link>
        </Button>
        <Button variant="outline" className="border-referra-500 text-referra-600 hover:bg-referra-50 flex-grow h-12 text-base" asChild>
          <Link to="/pending-matches">
            <Clock className="h-5 w-5 mr-2" />
            <span>Review Pending Matches</span>
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export const MetricsOverview = () => {
  const categories = [
    {
      title: "Priority Actions",
      cards: [
        {
          title: "Urgent Referrals",
          value: "5",
          description: "Needs immediate attention",
          icon: <Flame className="h-5 w-5 text-red-500" />,
          variant: 'attention' as const,
          path: "/urgent-referrals"
        },
        {
          title: "Pending Matches",
          value: "8",
          description: "Awaiting provider selection",
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          variant: 'warning' as const,
          path: "/pending-matches"
        },
        {
          title: "Clients Awaiting Intake",
          value: "17",
          description: "Needs processing",
          icon: <UserPlus className="h-5 w-5 text-referra-500" />,
          variant: 'default' as const,
          path: "/clients/intake"
        }
      ]
    },
    {
      title: "Referral Statistics",
      cards: [
        {
          title: "Active Referrals",
          value: "24",
          description: "Currently in progress",
          icon: <Zap className="h-5 w-5 text-referra-500" />,
          variant: 'default' as const,
          path: "/active-referrals"
        },
        {
          title: "Completed This Month",
          value: "42",
          description: "186 all-time completed",
          icon: <FileCheck className="h-5 w-5 text-green-500" />,
          variant: 'compliant' as const,
          path: "/completed-referrals"
        },
        {
          title: "Avg. Completion Time",
          value: "4.2 days",
          description: "↓ 0.8 days from last month",
          icon: <RotateCw className="h-5 w-5 text-gray-500" />,
          variant: 'neutral' as const
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <WelcomeHeader />
      
      {/* Primary Action Buttons */}
      <ActionCTABox />
      
      {/* Metrics Categories */}
      {categories.map((category, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {category.title}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {category.cards.map((card, cardIdx) => (
              <MetricCard
                key={cardIdx}
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
                variant={card.variant}
                onClick={card.path ? () => window.location.href = card.path : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;
