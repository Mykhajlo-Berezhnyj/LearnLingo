import { useEffect } from "react";
import { teachersStore } from "../../zustand/stores/teachers";
import { applyFilters } from "../filtering/applyFilters";

export function usePaginatedFavorites() {
  const {
    filters,
    favoriteTeachers,
    favoritePage,
    favoritePageSize,
    resetFavoritePage,
    setFavoritePage,
    setTotalCountFavorites,
  } = teachersStore();

  const filtered = applyFilters(favoriteTeachers, filters);

  useEffect(() => {
    setTotalCountFavorites(filtered.length);
    teachersStore.setState({ status: "succeeded" });
  }, [filtered.length, setTotalCountFavorites]);

  const visibleFavorites = filtered.slice(0, favoritePage * favoritePageSize);

  const isEndReached = favoritePage * favoritePageSize >= filtered.length;

  const loadMore = () => {
    if (!isEndReached) setFavoritePage(favoritePage + 1);
  };

  return {
    visibleFavorites,
    isEndReached,
    loadMore,
    resetFavoritePage,
    page: favoritePage,
  };
}
