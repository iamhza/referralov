
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Flame,
  Users,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardHeader from './DashboardHeader';
import ActionPanel from './ActionPanel';
import PriorityMetrics from './PriorityMetrics';
import ReferralMetrics from './ReferralMetrics';

export const MetricsOverview = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <DashboardHeader />
      <ActionPanel />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PriorityMetrics />
        <ReferralMetrics />
      </div>
    </div>
  );
};

export default MetricsOverview;
