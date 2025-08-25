import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Fetch error:', error);
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          console.log('Profile not found, creating new one');
          await createProfile();
        } else {
          throw error;
        }
      } else {
        console.log('Fetched profile data:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new profile
  const createProfile = async () => {
    if (!user) return;

    try {
      const newProfile = {
        user_id: user.id,
        username: user.email?.split('@')[0] || null,
        name: null,
        interests: ['Action', 'Drama', 'Comedy', 'Sci-Fi'] // Default interests
      };

      console.log('Creating new profile:', newProfile);

      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();

      if (error) {
        console.error('Create profile error:', error);
        throw error;
      }
      
      console.log('Created profile data:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile",
        variant: "destructive"
      });
    }
  };

  // Update profile name
  const updateName = async (name: string) => {
    if (!user || !profile) return;

    try {
      setSaving(true);
      const { data, error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      
      toast({
        title: "Success",
        description: "Name updated successfully",
      });
    } catch (error) {
      console.error('Error updating name:', error);
      toast({
        title: "Error",
        description: "Failed to update name",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Update profile interests
  const updateInterests = async (interests: string[]) => {
    if (!user || !profile) return;

    try {
      setSaving(true);
      console.log('Updating interests:', interests);
      console.log('User ID:', user.id);
      console.log('Current profile:', profile);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ interests })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Updated profile data:', data);
      setProfile(data);
      
      toast({
        title: "Success",
        description: "Interests updated successfully",
      });
    } catch (error) {
      console.error('Error updating interests:', error);
      toast({
        title: "Error",
        description: "Failed to update interests",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Fetch profile on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  return {
    profile,
    loading,
    saving,
    updateName,
    updateInterests,
    refetch: fetchProfile
  };
};
