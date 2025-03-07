
import React from 'react';
import { CheckCircle, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ReferralStage {
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

const stages: ReferralStage[] = [
  {
    name: 'New',
    count: 12,
    color: 'bg-blue-500',
    icon: <ArrowRight className="h-5 w-5 text-blue-500" />,
  },
  {
    name: 'Provider Matching',
    count: 8,
    color: 'bg-amber-500',
    icon: <Clock className="h-5 w-5 text-amber-500" />,
  },
  {
    name: 'In Progress',
    count: 16,
    color: 'bg-teal-500',
    icon: <ArrowRight className="h-5 w-5 text-teal-500" />,
  },
  {
    name: 'Urgent',
    count: 5,
    color: 'bg-red-500',
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
  },
  {
    name: 'Completed',
    count: 42,
    color: 'bg-green-500',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
  },
];

export const ReferralPipeline = () => {
  const totalReferrals = stages.reduce((acc, stage) => acc + stage.count, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Referral Pipeline</h2>
        <p className="text-sm text-gray-500 mt-1">Current status of all client referrals</p>
      </div>
      
      <div className="p-6">
        <div className="flex mb-4">
          {stages.map((stage) => (
            <div 
              key={stage.name}
              className="h-2 rounded-full"
              style={{ 
                width: `${(stage.count / totalReferrals) * 100}%`,
                backgroundColor: stage.color.replace('bg-', '')
              }}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stages.map((stage) => (
            <div 
              key={stage.name}
              className="flex items-center p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-full ${stage.color.replace('bg-', 'bg-').replace('500', '100')}`}>
                {stage.icon}
              </div>
              <div className="ml-4">
                <h3 className="font-medium">{stage.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-semibold">{stage.count}</span>
                  <span className="ml-1 text-sm text-gray-500">referrals</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-medium mb-3">Recent Updates</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-referra-100">
                <ArrowRight className="h-4 w-4 text-referra-700" />
              </div>
              <div>
                <p className="text-sm font-medium">New referral for Maria Johnson has been created</p>
                <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Provider accepted referral for John Smith</p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Clock className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Provider matching in progress for Robert Chen</p>
                <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPipeline;
