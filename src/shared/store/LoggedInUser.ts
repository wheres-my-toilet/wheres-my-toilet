import { create } from 'zustand';

type Store = {
  userData: { email: string; user_id: string; nickname: string };
  setUserData: ({ email, user_id, nickname }: { email: string; user_id: string; nickname: string }) => void;
};

export const useLoggedInUserStore = create<Store>((set) => ({
  userData: { email: '', user_id: '', nickname: 'poopy' },
  setUserData: ({ email, user_id, nickname }) => {
    set({ userData: { email, user_id, nickname } });
  },
}));
