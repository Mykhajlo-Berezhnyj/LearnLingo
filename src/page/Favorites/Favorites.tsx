import { useEffect } from "react";
import { usePaginatedTeachersStore } from "../../components/zustand/stores/teachers";
import css from "../Teachers/Teachers.module.css";
import TeachersList from "../../components/TeachersList/TeachersList";
import { useAuthStore } from "../../components/zustand/stores/authStore";
import { usePaginatedFavorites } from "../../components/utils/pagination/usePaginatedFavorites";

export default function Favorites() {
  const user = useAuthStore((s) => s.user);

  const { visibleFavorites, isEndReached, loadMore, page } =
    usePaginatedFavorites();
  const { loadFavoriteTeachers, resetFavorites } = usePaginatedTeachersStore();

  useEffect(() => {
    if (user?.uid) {
      resetFavorites();
      loadFavoriteTeachers();
    }
  }, [user?.uid]);

  return (
    <TeachersList
      className={css.teachers}
      teachers={visibleFavorites}
      isLoading={false}
      isEndReached={isEndReached}
      page={page}
      onLoadMore={loadMore}
    />
  );
}
