import { useUserLocationStore } from '@/shared/store/UserLocation';

//kakao rest api 위도/경도 -> 주소 변환
export const getAddress = async ({
  setUserAddress,
  userLocation,
}: {
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  userLocation: { lat: number; lng: number };
}) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${userLocation.lng}&y=${userLocation.lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      },
    );
    const { documents } = await response.json();
    const address = documents[0]?.address;
    setUserAddress(address.region_1depth_name + ' ' + address.region_2depth_name);
  } catch (error) {
    console.error(error);
  }
};
