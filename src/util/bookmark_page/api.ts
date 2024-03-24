import { supabase } from '@/shared/supabase/supabase';

export type Bookmark = {
  bookmark_id: number;
  toilet_id: number;
  toilet_location: {
    toilet_address: string;
    toilet_name: string;
  };
  user_uid: string;
};

export type ReviewRate = {
  toilet_id: number;
  toilet_loc_rate: number;
  toilet_clean_rate: number;
  toilet_pop_rate: number;
};

//유저의 북마크 목록 조회
export const getData = async (user_uid: string): Promise<Bookmark[]> => {
  try {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*, toilet_location(toilet_name, toilet_address)')
      .eq('user_uid', user_uid);

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

export const getReviewData = async (toiletIds: number[]): Promise<ReviewRate[]> => {
  try {
    const { data, error } = await supabase
      .from('review_info')
      .select('toilet_id, toilet_loc_rate, toilet_clean_rate, toilet_pop_rate')
      .in('toilet_id', toiletIds); //북마크 된 화장실 id

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }

    return data as ReviewRate[];
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
