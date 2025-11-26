import { useEffect } from "react";
import { useAuthStore } from "../zustand/stores/authStore";
import { teachersStore } from "../zustand/stores/teachers";

export function useInitFavorites() {
  const user = useAuthStore((s) => s.user);
  const { loadFavoriteTeachers, resetFavorites } = teachersStore();

  useEffect(() => {
    if (user?.uid) {
      resetFavorites();
      loadFavoriteTeachers();
    } else {
      resetFavorites();
    }
  }, [user?.uid]);
}
