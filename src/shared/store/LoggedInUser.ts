import { create } from 'zustand';

type store = {
  userData: { email: string; password: string };
  setUserData: ({ email, password }: { email: string; password: string }) => boolean;
};

export const useLoggedInUserStore = create((set) => ({
  userData: { email: '', password: '' },
  setUserData: ({ email, password }: { email: string; password: string }) => {
    set({ userData: { email, password } });
  },
}));
