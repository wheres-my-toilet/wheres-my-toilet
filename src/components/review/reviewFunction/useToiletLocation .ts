import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import { useEffect, useState } from 'react';

export const useToiletLocation = (id: number) => {
  const [toiletLocation, setToiletLocation] = useState<Database['public']['Tables']['toilet_location']['Row']>();

  useEffect(() => {
    const fetchToiletLocation = async () => {
      try {
        const { data: toilet_location, error } = await supabase
          .from('toilet_location')
          .select('*')
          .eq('toilet_id', id)
          .single();
        if (error) {
          throw error;
        }
        setToiletLocation(toilet_location);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToiletLocation();
  }, [id]);

  return toiletLocation;
};
