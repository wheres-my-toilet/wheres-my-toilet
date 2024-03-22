import { create } from 'zustand';

type Store = {
  userData: { email: string; user_uid: string; nickname: string };
  setUserData: ({ email, user_uid, nickname }: { email: string; user_uid: string; nickname: string }) => void;
};

export const useLoggedInUserStore = create<Store>((set) => ({
  userData: { email: '', user_uid: '', nickname: 'poopy' },
  setUserData: ({ email, user_uid, nickname }) => {
    set({ userData: { email, user_uid, nickname } });
  },
}));