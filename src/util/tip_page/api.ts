import { supabase } from '@/shared/supabase/supabase';
import { Tip } from '../../components/tip_page/TipList';

export const getTips = async (): Promise<Tip[]> => {
  try {
    const { data, error } = await supabase.from('tip').select('*');
    console.log(data);
    if (error) {
      console.error(error);
      throw error;
    }
    if (data !== null) {
      return data as Tip[];
    }
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
