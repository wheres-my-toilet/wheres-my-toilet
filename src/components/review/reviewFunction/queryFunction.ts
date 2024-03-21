import { supabase } from '@/shared/supabase/supabase';

import type { review_info } from '../type';

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getReview = async (id: number): Promise<review_info[]> => {
  const { data: review_info, error } = await supabase.from('review_info').select('*').eq('toilet_id', id);
  if (error) {
    throw error.message;
  }
  return review_info;
};

export const addReview = async (newReview: any) => {
  const { data, error } = await supabase.from('review_info').insert(newReview).select();
  return data;
};

export const changeReview = async (user_id: string, reviewCreatedat: string, changeText: string): Promise<void> => {
  const { data, error } = await supabase
    .from('review_info')
    .update({ review_content: changeText })
    .eq('user_id', user_id)
    .eq('review_createdat', reviewCreatedat)
    .select();
};

export const deleteReview = async (user: string, reviewCreatedat: string) => {
  const { error } = await supabase
    .from('review_info')
    .delete()
    .eq('user_id', user)
    .eq('review_createdat', reviewCreatedat);
};
