
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  AlertTriangle, 
  ArrowRight, 
  Calendar,
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  Users
} from 'lucide-react';

const Referrals = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-500">Track and manage your service referrals</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="bg-referra-500 hover:bg-referra-600"
              asChild
            >
              <Link to="/case-manager/new-referral">
                Create New Referral
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search referrals..." className="pl-9" />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Active</span>
            </TabsTrigger>
            <TabsTrigger value="urgent" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Urgent</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {[
              {
                id: "REF-4851",
                client: "James Wilson",
                service: "Mental Health Counseling",
                provider: "Minnesota Care Center",
                date: "Apr 11, 2025",
                status: "Matched",
                urgent: false
              },
              {
                id: "REF-4832",
                client: "Maria Johnson",
                service: "Substance Use Treatment",
                provider: "Recovery Health Services",
                date: "Apr 10, 2025",
                status: "In Progress",
                urgent: false
              },
              {
                id: "REF-4829",
                client: "Robert Smith",
                service: "Housing Support",
                provider: "Community Housing Alliance",
                date: "Apr 8, 2025",
                status: "Pending Matches",
                urgent: true
              }
            ].map((referral, index) => (
              <div key={index} className="border rounded-lg hover:border-referra-200 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{referral.id}</h3>
                        <Badge className={
                          referral.status === 'Matched' 
                            ? 'bg-blue-100 text-blue-800' 
                            : referral.status === 'In Progress' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }>
                          {referral.status}
                        </Badge>
                        {referral.urgent && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-800 mt-1">{referral.service}</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/case-manager/referral-tracker/${referral.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      Client: {referral.client}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Created: {referral.date}
                    </span>
                    {referral.provider && (
                      <span className="flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Provider: {referral.provider}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Last updated: Today at 2:30 PM
                  </span>
                  <Link 
                    to={referral.status === 'Pending Matches' 
                      ? `/case-manager/matched-providers/${referral.id}`
                      : `/case-manager/referral-tracker/${referral.id}`
                    } 
                    className="flex items-center text-sm text-referra-600 hover:text-referra-700 hover:underline"
                  >
                    {referral.status === 'Pending Matches' ? 'View matches' : 'Track progress'}
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            <div className="border rounded-lg hover:border-referra-200 transition-colors">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">REF-4829</h3>
                      <Badge className="bg-amber-100 text-amber-800">
                        Pending Matches
                      </Badge>
                      <Badge className="bg-red-100 text-red-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    </div>
                    <p className="text-gray-800 mt-1">Housing Support</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link to="/case-manager/matched-providers/4829">
                      View Matches
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Client: Robert Smith
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Created: Apr 8, 2025
                  </span>
                </div>
              </div>
              
              <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Last updated: Yesterday at 10:15 AM
                </span>
                <Link 
                  to="/case-manager/matched-providers/4829"
                  className="flex items-center text-sm text-referra-600 hover:text-referra-700 hover:underline"
                >
                  View matches
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {[
              {
                id: "REF-4851",
                client: "James Wilson",
                service: "Mental Health Counseling",
                provider: "Minnesota Care Center",
                date: "Apr 11, 2025",
                status: "Matched",
                urgent: false
              },
              {
                id: "REF-4832",
                client: "Maria Johnson",
                service: "Substance Use Treatment",
                provider: "Recovery Health Services",
                date: "Apr 10, 2025",
                status: "In Progress",
                urgent: false
              }
            ].map((referral, index) => (
              <div key={index} className="border rounded-lg hover:border-referra-200 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{referral.id}</h3>
                        <Badge className={
                          referral.status === 'Matched' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }>
                          {referral.status}
                        </Badge>
                      </div>
                      <p className="text-gray-800 mt-1">{referral.service}</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/case-manager/referral-tracker/${referral.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      Client: {referral.client}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Created: {referral.date}
                    </span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Provider: {referral.provider}
                    </span>
                  </div>
                </div>
                
                <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Last updated: Today at 2:30 PM
                  </span>
                  <Link 
                    to={`/case-manager/referral-tracker/${referral.id}`}
                    className="flex items-center text-sm text-referra-600 hover:text-referra-700 hover:underline"
                  >
                    Track progress
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="urgent" className="space-y-4">
            <div className="border rounded-lg hover:border-referra-200 transition-colors">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">REF-4829</h3>
                      <Badge className="bg-amber-100 text-amber-800">
                        Pending Matches
                      </Badge>
                      <Badge className="bg-red-100 text-red-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    </div>
                    <p className="text-gray-800 mt-1">Housing Support</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link to="/case-manager/matched-providers/4829">
                      View Matches
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Client: Robert Smith
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Created: Apr 8, 2025
                  </span>
                </div>
              </div>
              
              <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Last updated: Yesterday at 10:15 AM
                </span>
                <Link 
                  to="/case-manager/matched-providers/4829"
                  className="flex items-center text-sm text-referra-600 hover:text-referra-700 hover:underline"
                >
                  View matches
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
