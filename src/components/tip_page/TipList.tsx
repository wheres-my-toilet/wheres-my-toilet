'use client';

import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

type Tip = {
  id: string;
  create_at: string;
  title: string;
  content: string;
};

const TipList = () => {
  const fetchData = async (): Promise<Tip[]> => {
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tips'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  console.log(data);

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TipList;
