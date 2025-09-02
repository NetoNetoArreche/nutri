import React, { createContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { User as SupabaseUser, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`name, avatar_url, specialty`)
        .eq('id', supabaseUser.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return {
          id: supabaseUser.id,
          name: data.name || 'Novo Usuário',
          email: supabaseUser.email || '',
          avatar: data.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${data.name}`,
          specialty: data.specialty || 'Nutricionista',
          role: 'nutritionist',
        };
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    
    // Fallback to user_metadata if profile is not found or fails
    return {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || 'Novo Usuário',
        email: supabaseUser.email || '',
        avatar: supabaseUser.user_metadata?.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${supabaseUser.user_metadata?.name || supabaseUser.email}`,
        specialty: 'Nutricionista',
        role: 'nutritionist',
    };
  }, []);

  useEffect(() => {
    let timeoutId: number;
    
    const initializeAuth = async () => {
      try {
        // First, get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setUser(null);
          setLoading(false);
          return;
        }

        // Process the current session
        if (session?.user) {
          const profile = await getProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
        setLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        try {
          if (session?.user) {
            const profile = await getProfile(session.user);
            setUser(profile);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error processing auth state change:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    // Initialize auth immediately
    initializeAuth();

    // Safety timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      console.warn('Auth initialization timeout - stopping loading state');
      setLoading(false);
    }, 10000); // 10 seconds timeout

    return () => {
      subscription?.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [getProfile]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  }), [user, loading, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
