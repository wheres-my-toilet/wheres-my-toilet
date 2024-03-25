import { supabase } from '@/shared/supabase/supabase';

export type Bookmark = {
  bookmark_id: number;
  toilet_id: number;
  user_uid: string;
};

export const getBookmark = async (user_uid: string, id: number): Promise<Bookmark[]> => {
  try {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*')
      .eq('user_uid', user_uid)
      .match({ user_uid: user_uid, toilet_id: id });

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
