import { create } from "zustand";
import type { Teacher } from "../../../types/teacher";
import type { Filters } from "../../../types/filters";
import { getPaginatedTeachers } from "../../utils/pagination/getPaginatedTeachers";
import { useAuthStore } from "./authStore";
import {
  fetchFavorites,
  removeFavorite,
  saveFavorite,
} from "../../service/favoritesService";
import { getAllTeachers } from "../../utils/pagination/getAllTeachers";

interface TeachersStore {
  teachers: Teacher[];
  filters: Filters;
  sortBy: "rating" | "price";
  page: number;
  lastKey: string | null;
  isEndReached: boolean;
  isLoading: boolean;

  favorites: string[];
  favoriteTeachers: Teacher[];
  favoritePage: number;
  favoritePageSize: number;

  userId: string | null;

  setUserId: (id: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  setSortBy: (sort: "rating" | "price") => void;

  setFavorites: (ids: string[]) => void;
  setFavoriteTeachers: (teachers: Teacher[]) => void;
  setFavoritePage: (page: number) => void;
  resetFavoritePage: () => void;
  getVisibleFavorites: () => Teacher[];

  toggleFavorite: (id: string) => Promise<void>;
  loadTeachers: (page?: number) => Promise<void>;
  loadFavoriteTeachers: () => Promise<void>;
  resetTeachers: () => void;
  resetFavorites: () => void;
}

export const usePaginatedTeachersStore = create<TeachersStore>((set, get) => ({
  teachers: [],
  filters: {},
  sortBy: "rating",
  page: 1,
  lastKey: null,
  isEndReached: false,
  isLoading: false,

  favorites: [],
  favoriteTeachers: [],
  favoritePage: 1,
  favoritePageSize: 4,

  userId: null,
  setUserId: (id) => set({ userId: id }),

  setFilters: (newFilters) =>
    set(() => ({
      filters: { ...newFilters },
      page: 1,
      lastKey: null,
      isEndReached: false,
    })),

  clearFilters: () =>
    set({ filters: {}, page: 1, lastKey: null, isEndReached: false }),

  setSortBy: (sort) => set({ sortBy: sort }),

  setFavorites: (ids) => set({ favorites: ids }),
  setFavoriteTeachers: (teachers) => set({ favoriteTeachers: teachers }),
  setFavoritePage: (page) => set({ favoritePage: page }),
  resetFavoritePage: () => set({ favoritePage: 1 }),

  getVisibleFavorites: () => {
    const { favoriteTeachers, favoritePage, favoritePageSize } = get();
    return favoriteTeachers.slice(0, favoritePage * favoritePageSize);
  },

  toggleFavorite: async (id) => {
    const { favorites, favoriteTeachers } = get();
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const isAlreadyFavorite = favorites.includes(id);
    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    set({ favorites: updatedFavorites });

    try {
      if (isAlreadyFavorite) {
        await removeFavorite(userId, id);
        set({
          favoriteTeachers: favoriteTeachers.filter((t) => t.id !== id),
        });
      } else {
        await saveFavorite(userId, id);
        const snapshot = await getAllTeachers();
        const found = snapshot.find((t) => t.id === id);
        if (found) {
          set({ favoriteTeachers: [...favoriteTeachers, found] });
        }
      }
    } catch (error) {
      console.error("Failed to update favorites in DB:", error);
    }
  },

  loadFavoriteTeachers: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    try {
      const ids = await fetchFavorites(userId);
      set({ favorites: ids });

      const allTeachers = await getAllTeachers();
      const matched = allTeachers.filter((t) => ids.includes(t.id));
      set({ favoriteTeachers: matched });
    } catch (error) {
      console.error("Failed to load favorite teachers:", error);
    }
  },

  loadTeachers: async (page = 1) => {
    const { filters, sortBy, lastKey, teachers, isLoading, isEndReached } =
      get();
    if (isLoading) return;

    set({ isLoading: true });

    const result = await getPaginatedTeachers(
      filters,
      lastKey,
      4,
      sortBy,
      isEndReached
    );

    set({
      teachers:
        page === 1 ? result.teachers : [...teachers, ...result.teachers],
      lastKey: result.lastKey,
      isEndReached: result.isEndReached,
      page,
      isLoading: false,
    });
  },

  resetTeachers: () =>
    set({
      teachers: [],
      page: 1,
      lastKey: null,
      isEndReached: false,
    }),

  resetFavorites: () =>
    set({
      favorites: [],
      favoriteTeachers: [],
      favoritePage: 1,
    }),
}));
