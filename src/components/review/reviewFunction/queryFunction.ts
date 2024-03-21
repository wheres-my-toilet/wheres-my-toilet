import { review_info } from '@/app/detail_page/[id]/page';
import { supabase } from '@/shared/supabase/supabase';
import { useState } from 'react';

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.user_metadata.email;
};

export const getReview = async (id: number): Promise<review_info[]> => {
  const { data: review_info, error } = await supabase.from('review_info').select('*').eq('toilet_id', id);
  if (error) {
    throw error.message;
  }
  return review_info;
};
