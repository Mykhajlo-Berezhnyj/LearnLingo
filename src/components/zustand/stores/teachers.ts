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
import { updateQueryParams } from "../../utils/updateQueryParams";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface TeachersStore {
  teachers: Teacher[];
  filters: Filters;
  sortBy: "rating" | "price_per_hour";
  page: number;
  pageSize: number;
  totalCount: number | null;
  lastKey: string | null;
  isEndReached: boolean;
  status: Status;

  favorites: string[];
  favoriteTeachers: Teacher[];
  favoritePage: number;
  favoritePageSize: number;
  totalCountFavorites: number | null;

  userId: string | null;

  setUserId: (id: string) => void;

  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  setSortBy: (sort: "rating" | "price_per_hour") => void;

  setFavorites: (ids: string[]) => void;
  setFavoriteTeachers: (teachers: Teacher[]) => void;
  setFavoritePage: (page: number) => void;
  resetFavoritePage: () => void;
  getVisibleFavorites: () => Teacher[];
  setTotalCountFavorites: (count: number) => void;

  toggleFavorite: (id: string) => Promise<void>;
  loadTeachers: (page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  getVisibleTeachers: () => Teacher[];
  loadFavoriteTeachers: () => Promise<void>;
  resetTeachers: () => void;
  resetFavorites: () => void;
  initFromUrl: (params: URLSearchParams) => Promise<void>;
}

export const teachersStore = create<TeachersStore>((set, get) => ({
  teachers: [],
  filters: {},
  sortBy: "rating",
  page: 1,
  pageSize: 4,
  totalCount: 0,
  lastKey: null,
  isEndReached: false,
  status: "idle",

  favorites: [],
  favoriteTeachers: [],
  favoritePage: 1,
  favoritePageSize: 4,
  totalCountFavorites: null,

  userId: null,
  setUserId: (id) => set({ userId: id }),

  setTotalCountFavorites: (count) =>
    set({
      totalCountFavorites: count,
    }),

  setFilters: (newFilters) => {
    const cleanFilters: Filters = {};
    Object.entries({ ...get().filters, ...newFilters }).forEach(
      ([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          cleanFilters[key] = value;
        }
      }
    );

    set(() => ({
      filters: cleanFilters,
      page: 1,
      lastKey: null,
      isEndReached: false,
      status: "idle",
    }));

    updateQueryParams({
      page: "1",
      lastKey: null,
      ...Object.fromEntries(
        Object.entries(newFilters).map(([k, v]) => [k, v ?? null])
      ),
    });
  },

  clearFilters: () => {
    set({
      filters: {},
      page: 1,
      lastKey: null,
      isEndReached: false,
      status: "idle",
    });
    updateQueryParams({
      page: null,
      limit: null,
      lastKey: null,
      language: null,
      level: null,
      price_per_hour: null,
    });
  },

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

    set({
      favorites: updatedFavorites,
      totalCountFavorites:
        updatedFavorites.length === 0 ? null : updatedFavorites.length,
    });

    try {
      if (isAlreadyFavorite) {
        await removeFavorite(userId, id);
        const updatedTeachers = favoriteTeachers.filter((t) => t.id !== id);
        set({
          favoriteTeachers: updatedTeachers,
          totalCountFavorites:
            updatedTeachers.length === 0 ? null : updatedTeachers.length,
        });
      } else {
        await saveFavorite(userId, id);
        const snapshot = await getAllTeachers();
        const found = snapshot.find((t) => t.id === id);
        if (found) {
          const updatedTeachers = [...favoriteTeachers, found];
          set({
            favoriteTeachers: updatedTeachers,
            totalCountFavorites: updatedTeachers.length,
          });
        }
      }
    } catch (error) {
      console.error("Failed to update favorites in DB:", error);
    }
  },

  loadFavoriteTeachers: async () => {
    const userId = useAuthStore.getState().user?.uid;
    const status = get().status;

    if (!userId) return;
    if (status === "loading") return;

    set({ status: "loading" });
    try {
      const ids = await fetchFavorites(userId);
      set({ favorites: ids });
      if (ids.length === 0) {
        set({
          favoriteTeachers: [],
          status: "succeeded",
          totalCountFavorites: null,
        });
        return;
      }

      const allTeachers = await getAllTeachers();
      const matched = allTeachers.filter((t) => ids.includes(t.id));
      set({
        favoriteTeachers: matched,
        status: "succeeded",
        totalCountFavorites: matched.length,
      });
    } catch (error) {
      console.error("Failed to load favorite teachers:", error);
      set({ status: "failed" });
    }
  },

  loadTeachers: async () => {
    const { filters, lastKey, pageSize, teachers, status, page } = get();

    if (status === "loading") return;
    updateQueryParams({
      page: String(page),
      limit: String(pageSize),
      lastKey: lastKey ?? null,
    });

    set({ status: "loading" });
    try {
      const result = await getPaginatedTeachers(filters, lastKey, pageSize);

      if (Object.keys(filters).length === 0) {
        set({
          teachers:
            page === 1 ? result.teachers : [...teachers, ...result.teachers],
          lastKey: result.lastKey,
          isEndReached: result.isEndReached || !result.lastKey,
          page,
          status: "succeeded",
          totalCount: result.totalCount,
        });
      } else {
        set({
          teachers: result.teachers,
          lastKey: null,
          isEndReached: page * pageSize >= result.teachers.length,
          page,
          status: "succeeded",
          totalCount: result.totalCount,
        });
      }
    } catch (error) {
      console.log(error);
      set({ status: "failed" });
    }
  },

  loadMore: async () => {
    const { isEndReached, page } = get();

    if (isEndReached) return;

    const nextPage = page + 1;
    set({ page: nextPage, status: "idle" });
    await get().loadTeachers(nextPage);
  },

  getVisibleTeachers: () => {
    const { teachers, page, pageSize, filters } = get();

    if (Object.keys(filters).length === 0) {
      return teachers;
    } else {
      return teachers.slice(0, page * pageSize);
    }
  },

  resetTeachers: () =>
    set({
      teachers: [],
      status: "idle",
      // totalCount: 0,
    }),

  resetFavorites: () =>
    set({
      favorites: [],
      favoriteTeachers: [],
      status: "idle",
      totalCountFavorites: null,
    }),

  initFromUrl: async (params: URLSearchParams) => {
    const page = Number(params.get("page") ?? 1);
    const pageSize = Number(params.get("limit") ?? 4);
    const lastKey = params.get("lastKey");

    const filters: Filters = {};

    const language = params.get("language");
    if (language) filters.language = language;

    const level = params.get("level");
    if (level) filters.level = level;

    const price = params.get("price_per_hour");
    if (price) filters.price_per_hour = Number(price);

    set({ page, pageSize, lastKey, filters });
  },
}));
