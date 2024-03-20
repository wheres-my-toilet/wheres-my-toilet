import { create } from 'zustand';

type Store = {
  userLocation: { lat: number; lng: number };
  setLocation: (val: { lat: number; lng: number }) => void;
};

export const useUserLocationStore = create<Store>()((set) => ({
  userLocation: { lat: 37.5286, lng: 127.1264 }, //임시 기본값
  setLocation: (val) => set({ userLocation: { lat: val.lat, lng: val.lng } }),
}));
