
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  ClipboardList, 
  Clock,
  FileText, 
  Plus, 
  RefreshCw, 
  Search
} from 'lucide-react';

const CaseManagerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Manager Dashboard</h1>
            <p className="text-gray-500">Manage your referrals and service provider matches</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-referra-500 hover:bg-referra-600">
              <Link to="/case-manager/new-referral">
                <Plus className="h-4 w-4 mr-2" />
                New Referral
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { 
              title: "Active Referrals", 
              value: "12", 
              description: "Currently in progress",
              icon: <ClipboardList className="h-5 w-5 text-blue-500" />,
              color: "bg-blue-50"
            },
            { 
              title: "Pending Matches", 
              value: "5", 
              description: "Awaiting provider response",
              icon: <Clock className="h-5 w-5 text-amber-500" />,
              color: "bg-amber-50"
            },
            { 
              title: "Completed", 
              value: "28", 
              description: "Successfully matched",
              icon: <FileText className="h-5 w-5 text-green-500" />,
              color: "bg-green-50"
            }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <p className="font-medium text-gray-900">{stat.title}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Referral Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/case-manager/referrals" className="flex items-center gap-1 text-referra-600">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Your most recent referrals and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "REF-4851",
                  service: "Mental Health Counseling",
                  status: "matched",
                  date: "Apr 11, 2025",
                  provider: "Minnesota Care Center"
                },
                {
                  id: "REF-4850",
                  service: "Housing Support Services",
                  status: "pending",
                  date: "Apr 10, 2025",
                  provider: null
                },
                {
                  id: "REF-4848",
                  service: "Substance Use Treatment",
                  status: "in_progress",
                  date: "Apr 9, 2025",
                  provider: "Recovery Partners MN"
                },
                {
                  id: "REF-4845",
                  service: "Employment Services",
                  status: "completed",
                  date: "Apr 7, 2025",
                  provider: "WorkForce Solutions"
                }
              ].map((referral, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-referra-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{referral.id}</h3>
                        <Badge className={
                          referral.status === 'matched' ? 'bg-blue-100 text-blue-800' :
                          referral.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          referral.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {referral.status.replace('_', ' ').charAt(0).toUpperCase() + referral.status.replace('_', ' ').slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-800">{referral.service}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {referral.date}
                        {referral.provider && (
                          <span className="ml-3">
                            Provider: {referral.provider}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/case-manager/referral-tracker/${referral.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Search Providers</CardTitle>
              <CardDescription>Find service providers by service type, location, or specialty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search for providers..." 
                    className="pl-9 w-full border rounded-md h-10 outline-none focus:ring-2 focus:ring-referra-500"
                  />
                </div>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button variant="outline" className="justify-start">Mental Health</Button>
                <Button variant="outline" className="justify-start">Substance Use</Button>
                <Button variant="outline" className="justify-start">Housing</Button>
                <Button variant="outline" className="justify-start">Employment</Button>
                <Button variant="outline" className="justify-start">Healthcare</Button>
                <Button variant="outline" className="justify-start">More Services...</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/case-manager/new-referral">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Referral
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/case-manager/referrals">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  View All Referrals
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Matches
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseManagerDashboard;
