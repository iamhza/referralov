
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Clock, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReferralCardProps {
  id: string;
  clientName: string;
  service: string;
  urgency: 'high' | 'medium' | 'low';
  timeInStage: string;
  stage: 'pending' | 'matched' | 'active' | 'completed';
  providersCount?: number;
  onClick?: () => void;
}

const OpenReferrals = () => {
  const navigate = useNavigate();
  
  const referrals: ReferralCardProps[] = [
    {
      id: '1',
      clientName: 'John Smith',
      service: 'Adult rehabilitative mental health services (ARMHS)',
      urgency: 'high',
      timeInStage: '2 days',
      stage: 'matched',
      providersCount: 4
    },
    {
      id: '2',
      clientName: 'Maria Garcia',
      service: 'Housing stabilization services (HSS)',
      urgency: 'medium',
      timeInStage: '1 day',
      stage: 'pending'
    },
    {
      id: '3',
      clientName: 'David Lee',
      service: 'Opioid treatment – non-residential',
      urgency: 'high',
      timeInStage: '3 days',
      stage: 'matched',
      providersCount: 3
    },
    {
      id: '4',
      clientName: 'Sarah Johnson',
      service: 'Family training',
      urgency: 'low',
      timeInStage: '5 days',
      stage: 'active'
    }
  ];
  
  const handleViewAll = () => {
    navigate('/referrals');
  };
  
  const filteredReferrals = referrals.filter(ref => ref.stage !== 'completed');
  
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="pb-0 pt-5 flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Open Referrals</h2>
        <Button variant="ghost" size="sm" onClick={handleViewAll}>
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReferrals.map((referral) => (
            <ReferralCard 
              key={referral.id}
              {...referral}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ReferralCard: React.FC<ReferralCardProps> = ({ 
  id, 
  clientName, 
  service, 
  urgency, 
  timeInStage, 
  stage,
  providersCount,
  onClick 
}) => {
  const navigate = useNavigate();
  
  const urgencyColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-blue-100 text-blue-800'
  };
  
  const stageLabels = {
    pending: 'Pending Match',
    matched: 'Provider Selection',
    active: 'In Progress',
    completed: 'Completed'
  };
  
  const handleAction = () => {
    if (stage === 'matched') {
      navigate(`/matched-providers/${id}`);
    } else if (stage === 'active') {
      navigate(`/referral-tracker/${id}`);
    } else if (stage === 'pending') {
      navigate(`/referral-tracker/${id}`);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{clientName}</h3>
          <p className="text-sm text-gray-600">{service}</p>
        </div>
        <Badge className={urgencyColors[urgency]}>
          {urgency === 'high' && <Flame className="h-3 w-3 mr-1" />}
          {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority
        </Badge>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Clock className="h-4 w-4 mr-1" />
        <span>In stage for {timeInStage}</span>
      </div>
      
      {stage === 'matched' && providersCount && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span>{providersCount} providers matched</span>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-medium">
          Status: <span className="text-referra-600">{stageLabels[stage]}</span>
        </div>
        
        <Button 
          size="sm"
          onClick={handleAction}
          className={stage === 'matched' ? 'bg-referra-500 hover:bg-referra-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
        >
          {stage === 'matched' && "Select Provider"}
          {stage === 'active' && "Track Progress"}
          {stage === 'pending' && "View Details"}
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default OpenReferrals;
