import { useEffect } from "react";
import { useAuthStore } from "../zustand/stores/authStore";
import { usePaginatedTeachersStore } from "../zustand/stores/teachers";

export function useInitFavorites() {
  const user = useAuthStore((s) => s.user);
  const { loadFavoriteTeachers, resetFavorites } = usePaginatedTeachersStore();

  useEffect(() => {
    if (user?.uid) {
      resetFavorites();
      loadFavoriteTeachers();
    } else {
      resetFavorites();
    }
  }, [user?.uid]);
}
