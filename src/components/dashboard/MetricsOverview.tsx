
import React from 'react';
import { ArrowRight, Clock, Check, AlertCircle, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

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

export const MetricsOverview = () => {
  const categories = [
    {
      title: "Referrals",
      cards: [
        {
          title: "Active Referrals",
          value: "24",
          description: "12 in progress, 4 pending",
          icon: <ArrowRight className="h-5 w-5 text-referra-500" />,
          variant: 'default'
        },
        {
          title: "Pending Matches",
          value: "8",
          description: "Awaiting provider selection",
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          variant: 'warning'
        },
        {
          title: "Completed Referrals",
          value: "186",
          description: "Last 30 days: 42",
          icon: <Check className="h-5 w-5 text-green-500" />,
          variant: 'compliant'
        }
      ]
    },
    {
      title: "Clients",
      cards: [
        {
          title: "Total Clients",
          value: "98",
          description: "14 newly onboarded",
          icon: <Users className="h-5 w-5 text-referra-500" />,
          variant: 'default'
        },
        {
          title: "Currently Onboarding",
          value: "17",
          description: "5 awaiting intake",
          icon: <User className="h-5 w-5 text-amber-500" />,
          variant: 'neutral'
        }
      ]
    },
    {
      title: "Attention Required",
      cards: [
        {
          title: "Urgent Actions",
          value: "5",
          description: "Requires immediate attention",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          variant: 'attention'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {categories.map((category, idx) => (
        <div key={idx} className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            {category.title}
            {category.title === "Attention Required" && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                5
              </span>
            )}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
