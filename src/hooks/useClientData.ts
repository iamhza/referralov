
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { awsApiClient, ClientData } from '@/services/awsApiClient';
import { useToast } from '@/hooks/use-toast';

export function useClientData() {
  const { toast } = useToast();
  
  // Use React Query to fetch and cache client data
  const { 
    data: clientsData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await awsApiClient.getClients();
      
      if (!response.success) {
        // Show error toast but return empty array to prevent UI from breaking
        toast({
          title: "Error fetching clients",
          description: response.error || "Failed to load client data",
          variant: "destructive",
        });
        return [];
      }
      
      return response.data || [];
    },
  });

  const getClient = async (id: string): Promise<ClientData | null> => {
    const response = await awsApiClient.getClient(id);
    
    if (!response.success) {
      toast({
        title: "Error fetching client",
        description: response.error,
        variant: "destructive",
      });
      return null;
    }
    
    return response.data || null;
  };

  return {
    clients: clientsData || [],
    isLoading,
    error,
    refetch,
    getClient,
  };
}
