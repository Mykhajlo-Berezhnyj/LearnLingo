import { useEffect } from "react";
import { teachersStore } from "../../components/zustand/stores/teachers";
import css from "../Teachers/Teachers.module.css";
import { useAuthStore } from "../../components/zustand/stores/authStore";
import { usePaginatedFavorites } from "../../components/utils/pagination/usePaginatedFavorites";
import TeachersSection from "../../components/TeachersSection/TeachersSection";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

export default function Favorites() {
  const user = useAuthStore((s) => s.user);

  const { visibleFavorites, isEndReached, loadMore, page } =
    usePaginatedFavorites();

  const { loadFavoriteTeachers, resetFavorites, clearFilters, status } =
    teachersStore();

  useEffect(() => {
    resetFavorites();
    clearFilters();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      loadFavoriteTeachers();
    }
  }, [user?.uid, clearFilters]);

  return (
    <div className={css.teachersPage}>
      <FilterPanel />
      <TeachersSection
        className={css.teachers}
        teachers={visibleFavorites}
        status={status}
        isEndReached={isEndReached}
        page={page}
        onLoadMore={loadMore}
      />
    </div>
  );
}
