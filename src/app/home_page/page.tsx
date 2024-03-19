import { supabase } from '@/shared/supabase/supabase';
import Link from 'next/link';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function BasicMap() {
  // 수파베이스에 저장되어있는 테이블로부터 위도 ,경도  데이터 받아오기

  return (
    <>
      {/*  카테고리 */}
      <nav>
        <ul>
          <li>
            <Link href={`/loginNsignup_page`}>즐겨찾기</Link>
          </li>
          <li>
            <Link href={`/etiquette_page`}>화장실 에티켓</Link>
          </li>
          <li>
            <Link href={`/tip_page`}>쾌변하는 꿀팁</Link>
          </li>
        </ul>
      </nav>

      <main>
        {/* 검색 폼 */}
        <form>
          <input type="text" className="border-solid border-black rounded" />
          <input type="text" className="border-solid border-black rounded" />
        </form>

        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '350px',
          }}
          level={3} // 지도의 확대 레벨
        ></Map>
      </main>
    </>
  );
}
