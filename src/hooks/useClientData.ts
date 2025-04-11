
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useClientData(clientId?: string) {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: client,
    isLoading: isLoadingClient,
    error: clientError,
  } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      if (!clientId) return null;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', clientId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });

  const {
    data: clients = [],
    isLoading: isLoadingClients,
    error: clientsError,
  } = useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: async () => {
      let query = supabase.from('user_profiles').select('*');

      if (searchTerm) {
        query = query.ilike('full_name', `%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  return {
    client,
    clients,
    isLoadingClient,
    isLoadingClients,
    clientError,
    clientsError,
    searchTerm,
    setSearchTerm,
  };
}
