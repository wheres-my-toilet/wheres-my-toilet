import { create } from 'zustand';

type Store = {
  userLocation: { latitude: number; longitude: number };
  setLocation: (val: { latitude: number; longitude: number }) => void;
};

export const useUserLocationStore = create<Store>()((set) => ({
  userLocation: { latitude: 37.5286, longitude: 127.1264 }, //임시 기본값
  setLocation: (val) => set({ userLocation: { latitude: val.latitude, longitude: val.longitude } }),
}));
