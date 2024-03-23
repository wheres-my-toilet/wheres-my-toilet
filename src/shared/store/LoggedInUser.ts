import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Store {
  userData: { email: string; user_uid: string; nickname: string };
  setUserData: ({ email, user_uid, nickname }: { email: string; user_uid: string; nickname: string }) => void;
}

export const useLoggedInUserStore = create<Store>()(
  persist(
    (set) => ({
      userData: { email: '', user_uid: '', nickname: 'poopy' },
      setUserData: ({ email, user_uid, nickname }) => {
        set({ userData: { email, user_uid, nickname } });
      },
    }),
    {
      name: 'loggedin-store',
      storage: createJSONStorage(() => sessionStorage),
      version: 1.0,
    },
  ),
);
