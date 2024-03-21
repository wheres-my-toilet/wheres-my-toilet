import { supabase } from '@/shared/supabase/supabase';

export type Bookmark = {
  bookmark_id: number;
  toilet_id: number;
  toilet_location: {
    toilet_address: string;
    toilet_name: string;
  };
  user_id: string;
};

export const getData = async (user_id: string): Promise<Bookmark[]> => {
  try {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*, toilet_location(toilet_name, toilet_address)')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }

    return data as Bookmark[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteData = async (bookmarkId: number) => {
  try {
    const { error } = await supabase.from('bookmark').delete().eq('bookmark_id', bookmarkId);

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
