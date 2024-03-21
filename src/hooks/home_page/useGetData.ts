import { supabase } from '@/shared/supabase/supabase';
import { Location } from '@/types/home_page/types';
import { useEffect, useState } from 'react';

export default function useGetData() {
  const [locationInfoData, setLocationInfoData] = useState<Location[] | null>([]);

  async function getData() {
    const { data, error } = await supabase.from('toilet_location').select(' * ');

    setLocationInfoData(data);
    return { data, error };
  }

  useEffect(() => {
    getData();
  }, []);

  return { locationInfoData };
}
