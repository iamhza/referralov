
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isCaseManager: boolean;
  isProvider: boolean;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          setUserRole(null);
          setUserProfile(null);
        } else if (session?.user) {
          // We'll load profile data via setTimeout to avoid Supabase deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchUserProfile(userId: string) {
    try {
      // Use a simple query that won't trigger the recursion error
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUserRole(data.role);
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        if (data.user.id) {
          await fetchUserRole(data.user.id);
        }
        
        toast({
          title: 'Signed in successfully',
          description: `Welcome back, ${data.user.email}!`,
        });
        
        setTimeout(() => {
          if (userRole === 'admin') {
            navigate('/admin');
          } else if (userRole === 'provider') {
            navigate('/provider');
          } else {
            navigate('/case-manager');
          }
        }, 500);
      }
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName,
            role: userData?.role || 'case_manager',
          },
        },
      });

      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        toast({
          title: 'Account created',
          description: 'Please check your email to confirm your account',
        });
        // We won't return the data object to match the Promise<void> return type
      }
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Sign out failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Signed out successfully',
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const isAdmin = userRole === 'admin';
  const isCaseManager = userRole === 'case_manager';
  const isProvider = userRole === 'provider';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isCaseManager,
        isProvider,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
