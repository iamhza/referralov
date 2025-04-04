
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { awsApiClient, ClientData } from '@/services/awsApiClient';
import { useToast } from '@/hooks/use-toast';

export function useClientData() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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
    // Only attempt to fetch if API_URL is configured
    enabled: Boolean(import.meta.env.VITE_AWS_API_URL),
  });

  // Fetch a single client by ID
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

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: (clientData: Omit<ClientData, 'id' | 'lastUpdated' | 'activeReferrals'>) => 
      awsApiClient.createClient(clientData),
    onSuccess: () => {
      // Invalidate and refetch the clients query to update the UI
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Client created",
        description: "New client has been successfully added",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating client",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  // Update client mutation
  const updateClientMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClientData> }) => 
      awsApiClient.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Client updated",
        description: "Client information has been successfully updated",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating client",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  // Delete client mutation
  const deleteClientMutation = useMutation({
    mutationFn: (id: string) => awsApiClient.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Client deleted",
        description: "Client has been successfully removed",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting client",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  return {
    clients: clientsData || [],
    isLoading,
    error,
    refetch,
    getClient,
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isDeleting: deleteClientMutation.isPending
  };
}
