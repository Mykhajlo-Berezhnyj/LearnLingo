import { create } from "zustand";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../../firebase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    set({ user, isLoading: false });
  });

  window.addEventListener("beforeunload", unsubscribe);

  return {
    user: auth.currentUser,
    isLoading: !auth.currentUser,
    setUser: (user) => set({ user }),
    updateUser: (data) => {
      const currentUser = get().user;
      if (currentUser) {
        set({ user: { ...currentUser, ...data } as User });
      }
    },
    logout: async () => {
      await signOut(auth);
      set({ user: null });
    },
  };
});
