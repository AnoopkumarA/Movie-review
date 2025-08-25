import { supabase } from '@/integrations/supabase/client';

export const checkSchema = async () => {
  try {
    // Try to select the new fields to see if they exist
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, username, name, interests')
      .limit(1);

    if (error) {
      console.error('Schema check error:', error);
      return false;
    }

    console.log('Schema check successful. Available fields:', Object.keys(data[0] || {}));
    return true;
  } catch (error) {
    console.error('Schema check failed:', error);
    return false;
  }
};
