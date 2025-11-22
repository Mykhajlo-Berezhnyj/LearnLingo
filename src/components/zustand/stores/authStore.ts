import { create } from "zustand";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../../firebase";
import { usePaginatedTeachersStore } from "./teachers";
import { getIsCheckingEmail } from "../../service/checkEmailExists";

interface AuthState {
  user: User | null;
  pendingEmail: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
  setPendingEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: auth.currentUser,
  pendingEmail: null,
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
    usePaginatedTeachersStore.getState().resetFavorites();
  },
  setPendingEmail: (email) => set({ pendingEmail: email }),
}));

onAuthStateChanged(auth, (user) => {
  if (!getIsCheckingEmail()) {
    useAuthStore.setState({ user, isLoading: false });
  }
});

window.addEventListener("beforeunload", () => {});
