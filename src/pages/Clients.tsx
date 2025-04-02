
import React, { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ClientTable from '@/components/dashboard/ClientTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
              <p className="text-gray-500 mt-1">Manage your clients and their referrals</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="text-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-referra-500 hover:bg-referra-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-9 w-full" 
                placeholder="Search by client name, ID, or referral..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
              <Button variant="outline" size="sm">Status</Button>
              <Button variant="outline" size="sm">Date Range</Button>
              <Button variant="outline" size="sm">Service Type</Button>
            </div>
          </div>

          {/* Tabs and content */}
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Card className="border-0 shadow-none">
                <ClientTable />
              </Card>
            </TabsContent>
            <TabsContent value="active" className="mt-0">
              <Card className="border-0 shadow-none">
                <ClientTable />
              </Card>
            </TabsContent>
            <TabsContent value="inactive" className="mt-0">
              <Card className="border-0 shadow-none">
                <p className="py-12 text-center text-gray-500">No inactive clients found.</p>
              </Card>
            </TabsContent>
            <TabsContent value="archived" className="mt-0">
              <Card className="border-0 shadow-none">
                <p className="py-12 text-center text-gray-500">No archived clients found.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
