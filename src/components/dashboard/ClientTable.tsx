
import React from 'react';
import { ArrowRight, Search, UserPlus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed' | 'urgent';
  activeReferrals: number;
  lastUpdated: string;
}

const clients: Client[] = [
  { id: '1', name: 'John Smith', status: 'active', activeReferrals: 2, lastUpdated: '2d ago' },
  { id: '2', name: 'Maria Johnson', status: 'pending', activeReferrals: 1, lastUpdated: '4h ago' },
  { id: '3', name: 'Robert Chen', status: 'completed', activeReferrals: 0, lastUpdated: '1w ago' },
  { id: '4', name: 'Fatima Ali', status: 'urgent', activeReferrals: 3, lastUpdated: '1h ago' },
  { id: '5', name: 'James Wilson', status: 'active', activeReferrals: 1, lastUpdated: '3d ago' },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  completed: 'bg-gray-100 text-gray-800',
  urgent: 'bg-red-100 text-red-800',
};

export const ClientTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row justify-between gap-4 items-center border-b">
        <h2 className="text-xl font-semibold">Client Management</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input className="pl-9 w-full" placeholder="Search clients..." />
          </div>
          <Button className="bg-referra-500 hover:bg-referra-600 transition-colors">
            <UserPlus className="h-4 w-4 mr-2" />
            <span>Add Client</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Active Referrals</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr 
                key={client.id} 
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="bg-referra-100 text-referra-700 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-gray-500">ID: {client.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge className={`${statusColors[client.status]} hover:${statusColors[client.status]}`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {client.activeReferrals}
                </td>
                <td className="py-4 px-6 text-gray-500">
                  {client.lastUpdated}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-referra-600 border-referra-200 hover:bg-referra-50 hover:text-referra-700 transition-colors"
                      asChild
                    >
                      <Link to="/new-referral">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Refer
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t bg-gray-50 text-center">
        <Button variant="link" className="text-referra-600 hover:text-referra-700">
          View all clients
        </Button>
      </div>
    </div>
  );
};

export default ClientTable;
