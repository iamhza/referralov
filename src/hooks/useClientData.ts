
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { awsApiClient, ClientData } from '@/services/awsApiClient';
import { useToast } from '@/hooks/use-toast';

// Sample mock data to use when API is unavailable
const MOCK_CLIENTS: ClientData[] = [
  {
    id: 'mock-1',
    name: 'Jane Smith',
    status: 'active',
    email: 'jane.smith@example.com',
    phone: '555-123-4567',
    address: '123 Main St',
    city: 'Minneapolis',
    state: 'MN',
    zipcode: '55401',
    dateOfBirth: '1982-04-15',
    insuranceType: 'Medicare',
    urgency: 'medium',
    activeReferrals: 2,
    lastUpdated: '2025-04-10',
    accessibilityNeeds: ['Wheelchair Access'],
    culturalNeeds: ['Vegetarian Meals'],
    languagePreferences: ['English', 'Spanish']
  },
  {
    id: 'mock-2',
    name: 'Robert Johnson',
    status: 'pending',
    email: 'robert.j@example.com',
    phone: '555-987-6543',
    city: 'St. Paul',
    state: 'MN',
    urgency: 'high',
    activeReferrals: 1,
    lastUpdated: '2025-04-08',
    culturalNeeds: ['Halal Meals']
  },
  {
    id: 'mock-3',
    name: 'Maria Garcia',
    status: 'urgent',
    email: 'maria.garcia@example.com',
    phone: '555-222-3333',
    address: '456 Oak Ave',
    city: 'Minneapolis',
    state: 'MN',
    zipcode: '55403',
    dateOfBirth: '1990-09-22',
    insuranceType: 'Medicaid',
    urgency: 'critical',
    activeReferrals: 3,
    lastUpdated: '2025-04-11',
    accessibilityNeeds: ['Visual Assistance'],
    culturalNeeds: ['Spanish Speaking Provider'],
    languagePreferences: ['Spanish']
  }
];

export function useClientData() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  
  // Check API availability on hook mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await awsApiClient.testConnection();
        setIsApiAvailable(response.success);
        
        if (!response.success) {
          console.error('API connection test failed:', response.error);
          setUseMockData(true);
          toast({
            title: "API Connection Issue",
            description: "Unable to connect to the client data API. Using mock data instead.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setIsApiAvailable(false);
        setUseMockData(true);
        console.error('API connection check error:', error);
        toast({
          title: "API Connection Error",
          description: "Failed to connect to API. Using mock data instead.",
          variant: "destructive",
        });
      }
    };
    
    checkApiConnection();
  }, [toast]);
  
  // Use React Query to fetch and cache client data
  const { 
    data: clientsData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      if (useMockData) {
        console.log("Using mock client data");
        return MOCK_CLIENTS;
      }
      
      const response = await awsApiClient.getClients();
      
      if (!response.success) {
        // If API request fails, switch to mock data
        setUseMockData(true);
        
        toast({
          title: "Error fetching clients",
          description: response.error || "Failed to load client data. Using mock data instead.",
          variant: "destructive",
        });
        
        return MOCK_CLIENTS;
      }
      
      return response.data || [];
    },
    // Only attempt to fetch if API_URL is configured and API is available
    enabled: Boolean(import.meta.env.VITE_AWS_API_URL) && (isApiAvailable !== false || useMockData),
    // Add retry configuration
    retry: 1,
    retryDelay: 1000,
  });

  // Fetch a single client by ID
  const getClient = async (id: string): Promise<ClientData | null> => {
    if (useMockData) {
      const mockClient = MOCK_CLIENTS.find(client => client.id === id);
      return mockClient || null;
    }
    
    if (isApiAvailable === false && !useMockData) {
      toast({
        title: "API Unavailable",
        description: "Cannot fetch client data while API is unavailable",
        variant: "destructive",
      });
      return null;
    }
    
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
    mutationFn: (clientData: Omit<ClientData, 'id' | 'lastUpdated' | 'activeReferrals'>) => {
      if (useMockData) {
        // Create a mock client with a generated ID
        const mockClient: ClientData = {
          ...clientData,
          id: `mock-${Date.now()}`,
          lastUpdated: new Date().toISOString().split('T')[0],
          activeReferrals: 0
        };
        
        // Add to mock clients
        MOCK_CLIENTS.push(mockClient);
        return Promise.resolve({ success: true, data: mockClient });
      }
      
      return awsApiClient.createClient(clientData);
    },
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
    mutationFn: ({ id, data }: { id: string; data: Partial<ClientData> }) => {
      if (useMockData) {
        // Find and update the mock client
        const clientIndex = MOCK_CLIENTS.findIndex(client => client.id === id);
        if (clientIndex !== -1) {
          MOCK_CLIENTS[clientIndex] = {
            ...MOCK_CLIENTS[clientIndex],
            ...data,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
          return Promise.resolve({ success: true, data: MOCK_CLIENTS[clientIndex] });
        }
        return Promise.resolve({ success: false, error: "Client not found" });
      }
      
      return awsApiClient.updateClient(id, data);
    },
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
    mutationFn: (id: string) => {
      if (useMockData) {
        // Remove the client from mock data
        const clientIndex = MOCK_CLIENTS.findIndex(client => client.id === id);
        if (clientIndex !== -1) {
          MOCK_CLIENTS.splice(clientIndex, 1);
          return Promise.resolve({ success: true });
        }
        return Promise.resolve({ success: false, error: "Client not found" });
      }
      
      return awsApiClient.deleteClient(id);
    },
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

  // Enable switching between real and mock data
  const toggleMockData = (useMock: boolean) => {
    setUseMockData(useMock);
    if (useMock) {
      toast({
        title: "Using Mock Data",
        description: "The application is now using mock data instead of API",
        variant: "default",
      });
    } else if (isApiAvailable === false) {
      toast({
        title: "API Still Unavailable",
        description: "Cannot switch to real API data while API is unavailable",
        variant: "destructive",
      });
      setUseMockData(true); // Force mock data if API is unavailable
    } else {
      toast({
        title: "Using Real API Data",
        description: "The application is now using real API data",
        variant: "default",
      });
      // Refetch data from real API
      refetch();
    }
  };

  return {
    clients: clientsData || [],
    isLoading,
    error,
    refetch,
    isApiAvailable,
    useMockData,
    toggleMockData,
    getClient,
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isDeleting: deleteClientMutation.isPending
  };
}
