
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export function useProviderMatching(referralId?: string | number) {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState({
    distance: true,
    insurance: true,
    availability: true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'availability'>('match');

  // Get matched providers for a referral
  const {
    data: matches = [],
    isLoading: isLoadingMatches,
    error: matchesError,
    refetch: refetchMatches,
  } = useQuery({
    queryKey: ['referral-matches', referralId],
    queryFn: async () => {
      if (!referralId) return [];

      const { data, error } = await supabase
        .from('referral_matches')
        .select('*, dhs_providers(*)')
        .eq('referral_id', referralId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!referralId,
  });

  // Get all available providers (for admin matching)
  const {
    data: availableProviders = [],
    isLoading: isLoadingProviders,
    error: providersError,
  } = useQuery({
    queryKey: ['available-providers', referralId, searchTerm, filters],
    queryFn: async () => {
      if (!referralId || !isAdmin) return [];

      // Get referral details first to match against providers
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('id', referralId)
        .single();

      if (referralError) throw referralError;

      // Now query providers based on referral requirements
      let query = supabase.from('dhs_providers').select('*');

      // Add search filtering
      if (searchTerm) {
        query = query.or(`providername.ilike.%${searchTerm}%,servicename.ilike.%${searchTerm}%`);
      }

      // Add service type filtering
      if (referral.service_type) {
        query = query.contains('service_type', [referral.service_type]);
      }

      // Add insurance filtering if enabled
      if (filters.insurance && referral.insurance_required && referral.insurance_required.length > 0) {
        query = query.overlaps('insurance_accepted', referral.insurance_required);
      }

      // We would add more filters here for distance and availability
      // but that requires more complex logic that would depend on your data structure

      const { data, error } = await query.limit(50);

      if (error) throw error;
      return data || [];
    },
    enabled: !!referralId && isAdmin,
  });

  // Create provider matches
  const createMatchesMutation = useMutation({
    mutationFn: async (providerIds: number[]) => {
      if (!referralId) throw new Error('Referral ID is required');

      const matchesToCreate = providerIds.map(providerId => ({
        referral_id: Number(referralId),
        dhs_provider_id: providerId,
        is_selected: false,
        response: 'pending',
      }));

      const { data, error } = await supabase
        .from('referral_matches')
        .insert(matchesToCreate)
        .select();

      if (error) throw error;

      // Also update the referral status to 'matched'
      await supabase
        .from('referrals')
        .update({ status: 'matched' })
        .eq('id', referralId);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral-matches', referralId] });
      queryClient.invalidateQueries({ queryKey: ['referral', referralId] });
      toast({
        title: 'Providers matched',
        description: 'The selected providers have been matched with this referral.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating matches',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Select a provider for a referral
  const selectProviderMutation = useMutation({
    mutationFn: async (matchId: number) => {
      if (!referralId) throw new Error('Referral ID is required');

      // First, update the selected match
      const { error: matchError } = await supabase
        .from('referral_matches')
        .update({ is_selected: true })
        .eq('id', matchId);

      if (matchError) throw matchError;

      // Then update the referral status
      const { data, error: referralError } = await supabase
        .from('referrals')
        .update({ status: 'active', started_at: new Date().toISOString() })
        .eq('id', referralId)
        .select()
        .single();

      if (referralError) throw referralError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral-matches', referralId] });
      queryClient.invalidateQueries({ queryKey: ['referral', referralId] });
      toast({
        title: 'Provider selected',
        description: 'The provider has been selected for this referral.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error selecting provider',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    matches,
    availableProviders,
    isLoadingMatches,
    isLoadingProviders,
    matchesError,
    providersError,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    createMatches: createMatchesMutation.mutate,
    selectProvider: selectProviderMutation.mutate,
    isCreatingMatches: createMatchesMutation.isPending,
    isSelectingProvider: selectProviderMutation.isPending,
    refetchMatches,
  };
}
