import { usePaginatedTeachersStore } from "../../zustand/stores/teachers";

export function usePaginatedFavorites() {
  const {
    favoriteTeachers,
    favoritePage,
    favoritePageSize,
    setFavoritePage,
    resetFavoritePage,
  } = usePaginatedTeachersStore();

  const visibleFavorites = favoriteTeachers.slice(
    0,
    favoritePage * favoritePageSize
  );
  const isEndReached = visibleFavorites.length >= favoriteTeachers.length;

  const loadMore = () => {
    if (!isEndReached) {
      setFavoritePage(favoritePage + 1);
    }
  };

  return {
    visibleFavorites,
    isEndReached,
    loadMore,
    resetFavoritePage,
    page: favoritePage,
  };
}
