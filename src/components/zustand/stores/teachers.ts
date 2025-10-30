import { create } from "zustand";
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  get as getFromDB,
} from "firebase/database";
import type { Teacher } from "../../../types/teacher";
import type { Filters } from "../../../types/filters";

interface TeachersStore {
  teachers: Teacher[];
  favorites: string[];
  filters: Filters;
  sortBy: "rating" | "price";
  page: number;
  isEndReached: boolean;
  isLoading: boolean;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  toggleFavorite: (id: string) => void;
  setSortBy: (sort: "rating" | "price") => void;
  loadInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
}

// ===== Функції фільтрації та сортування =====
function applyFilters(list: Teacher[], filters: Filters): Teacher[] {
  return list.filter((t) => {
    const matchLanguage = filters.language
      ? t.language === filters.language
      : true;
    const matchLevel = filters.level ? t.levels?.includes(filters.level) : true;
    const matchPrice = filters.maxPrice
      ? t.price_per_hour <= filters.maxPrice
      : true;
    return matchLanguage && matchLevel && matchPrice;
  });
}

function applySort(list: Teacher[], sortBy: "rating" | "price"): Teacher[] {
  return [...list].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return a.price_per_hour - b.price_per_hour;
  });
}

// ===== Основне сховище Zustand =====
export const usePaginatedTeachersStore = create<TeachersStore>((set, get) => ({
  teachers: [],
  favorites: [],
  filters: {},
  sortBy: "rating",
  page: 0,
  isEndReached: false,
  isLoading: false,

  // --- Зміна фільтрів ---
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  // --- Скидання фільтрів ---
  clearFilters: () => set({ filters: {} }),

  // --- Тогл улюблених ---
  toggleFavorite: (id) => {
    const { favorites } = get();
    set({
      favorites: favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id],
    });
  },

  // --- Встановлення сортування ---
  setSortBy: (sort) => set({ sortBy: sort }),

  // --- Завантаження першої сторінки ---
  async loadInitial() {
    set({ isLoading: true });

    const { filters, sortBy } = get();
    const db = getDatabase();
    const q = query(ref(db, "teachers"), orderByKey(), limitToFirst(4));

    const snapshot = await getFromDB(q);
    const raw = snapshot.val();

    if (!raw) {
      set({ teachers: [], isEndReached: true, isLoading: false });
      return;
    }

    const list = Object.entries(raw).map(([id, value]: [string, any]) => ({
      id,
      ...value,
      avatar_url: value.avatar_url || "/images/defaultAvatar.png",
      languages: value.languages ? Object.values(value.languages) : [],
      conditions: value.conditions ? Object.values(value.conditions) : [],
      reviews: value.reviews ? Object.values(value.reviews) : [],
      levels: value.levels ? Object.values(value.levels) : [],
    }));

    const filtered = applyFilters(list, filters);
    const sorted = applySort(filtered, sortBy);

    set({
      teachers: sorted,
      page: 1,
      isEndReached: sorted.length < 4,
      isLoading: false,
    });
  },

  // --- Довантаження наступної сторінки ---
  async loadMore() {
    const { teachers, filters, sortBy, page, isEndReached } = get();
    if (isEndReached || teachers.length === 0) return;

    set({ isLoading: true });

    const lastKey = teachers.at(-1)?.id;
    const db = getDatabase();
    const q = query(
      ref(db, "teachers"),
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(4)
    );

    const snapshot = await getFromDB(q);
    const raw = snapshot.val();

    if (!raw) {
      set({ isEndReached: true, isLoading: false });
      return;
    }

    const list = Object.entries(raw).map(([id, value]: [string, any]) => ({
      id,
      ...value,
      avatar_url: value.avatar_url || "/images/defaultAvatar.png",
      languages: value.languages ? Object.values(value.languages) : [],
      conditions: value.conditions ? Object.values(value.conditions) : [],
      reviews: value.reviews ? Object.values(value.reviews) : [],
      levels: value.levels ? Object.values(value.levels) : [],
    }));

    const filtered = applyFilters(list, filters);
    const sorted = applySort(filtered, sortBy);

    set({
      teachers: [...teachers, ...sorted],
      page: page + 1,
      isEndReached: filtered.length < 4,
      isLoading: false,
    });
  },
}));
