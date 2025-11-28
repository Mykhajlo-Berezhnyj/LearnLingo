import { useEffect } from "react";
import { teachersStore } from "../../components/zustand/stores/teachers";
import css from "../Teachers/Teachers.module.css";
import { useAuthStore } from "../../components/zustand/stores/authStore";
import { usePaginatedFavorites } from "../../components/utils/pagination/usePaginatedFavorites";
import TeachersSection from "../../components/TeachersSection/TeachersSection";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { Navigate } from "react-router-dom";

export default function Favorites() {
  const user = useAuthStore((s) => s.user);

  const { visibleFavorites, isEndReached, loadMore, page } =
    usePaginatedFavorites();

  const {
    loadFavoriteTeachers,
    resetFavorites,
    clearFilters,
    status,
    totalCountFavorites,
  } = teachersStore();

  useEffect(() => {
    resetFavorites();
    clearFilters();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      loadFavoriteTeachers();
    }
  }, [user?.uid, clearFilters]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={css.teachersPage}>
      <FilterPanel totalCount={totalCountFavorites} />
      <TeachersSection
        className={css.teachers}
        teachers={visibleFavorites}
        status={status}
        isEndReached={isEndReached}
        page={page}
        totalCount={totalCountFavorites}
        onLoadMore={loadMore}
      />
    </div>
  );
}
