
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
}

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  className,
  variant = 'default'
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
    <Card className={cn(
      "bg-white rounded-lg shadow-sm p-5 flex justify-between items-start", 
      getVariantStyles(),
      className
    )}>
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

const ActionCTABox = () => {
  return (
    <Card className="bg-gradient-to-r from-referra-500/10 to-referra-600/5 p-6 border-none shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="bg-referra-500 hover:bg-referra-600 transition-colors flex-grow" asChild>
          <Link to="/new-referral">
            <ArrowRight className="h-4 w-4 mr-2" />
            <span>New Referral Request</span>
          </Link>
        </Button>
        <Button variant="outline" className="border-referra-500 text-referra-600 hover:bg-referra-50 flex-grow" asChild>
          <Link to="/pending-matches">
            <Clock className="h-4 w-4 mr-2" />
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
      title: "Referrals Overview",
      description: "Priority First",
      cards: [
        {
          title: "Urgent Actions",
          value: "5",
          description: "🔥 Needs Immediate Action",
          icon: <Flame className="h-5 w-5 text-red-500" />,
          variant: 'attention' as const
        },
        {
          title: "Pending Matches",
          value: "8",
          description: "🚨 Needs Provider Selection",
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          variant: 'warning' as const
        },
        {
          title: "Active Referrals",
          value: "24",
          description: "⚡ Ongoing Cases",
          icon: <Zap className="h-5 w-5 text-referra-500" />,
          variant: 'default' as const
        },
        {
          title: "Completed Referrals",
          value: "186",
          description: "✅ Last 30 days: 42",
          icon: <FileCheck className="h-5 w-5 text-green-500" />,
          variant: 'compliant' as const
        }
      ]
    },
    {
      title: "Client Status",
      description: "Only What Matters",
      cards: [
        {
          title: "Clients Awaiting Intake",
          value: "17",
          description: "📌 Needs Processing",
          icon: <UserPlus className="h-5 w-5 text-referra-500" />,
          variant: 'default' as const
        },
        {
          title: "Clients with Active Referrals",
          value: "32",
          description: "🔄 Still in Progress",
          icon: <RotateCw className="h-5 w-5 text-amber-500" />,
          variant: 'neutral' as const
        },
        {
          title: "Clients in Urgent Status",
          value: "7",
          description: "🚨 Requires Immediate Attention",
          icon: <UserX className="h-5 w-5 text-red-500" />,
          variant: 'attention' as const
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Action CTA Box */}
      <div className="mb-2">
        <ActionCTABox />
      </div>
      
      {/* Metrics Categories */}
      {categories.map((category, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex items-baseline">
            <h2 className="text-lg font-semibold">
              {category.title}
            </h2>
            <span className="ml-2 text-xs text-gray-500">{category.description}</span>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {category.cards.map((card, cardIdx) => (
              <MetricCard
                key={cardIdx}
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
                variant={card.variant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;
