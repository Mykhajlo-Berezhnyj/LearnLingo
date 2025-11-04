import {
  getDatabase,
  ref,
  query,
  orderByKey,
  orderByChild,
  equalTo,
  startAt,
  limitToFirst,
  get as getFromDB,
} from "firebase/database";
import type { Filters } from "../../../types/filters";
import type { TeacherRaw, Teacher } from "../../../types/teacher";
import { applyFilters } from "../filtering/applyFilters";
import { applySort } from "../filtering/applySort";
import { shouldEnableFrontendSorting } from "../filtering/shouldEnableFrontendSorting";

interface PaginatedResult {
  teachers: Teacher[];
  lastKey: string | null;
  isEndReached: boolean;
}

export async function getPaginatedTeachers(
  filters: Filters,
  lastKey: string | null = null,
  pageSize = 4,
  sortBy: "rating" | "price" = "rating",
  isEndReached: boolean
): Promise<PaginatedResult> {
  const db = getDatabase();
  const activeFilters = Object.entries(filters).filter(([_, v]) => v != null);
  const isBackendPagination = activeFilters.length <= 1;

  let q;

  if (activeFilters.length === 0) {
    q = lastKey
      ? query(
          ref(db, "teachers"),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(ref(db, "teachers"), orderByKey(), limitToFirst(pageSize));
  } else if (isBackendPagination) {
    const [key, value] = activeFilters[0];
    const path = key === "language" ? `languages/${value}` : `levels/${value}`;
    q = lastKey
      ? query(
          ref(db, "teachers"),
          orderByChild(path),
          equalTo(true),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(
          ref(db, "teachers"),
          orderByChild(path),
          equalTo(true),
          limitToFirst(pageSize)
        );
  } else {
    const path = filters.language
      ? `languages/${filters.language}`
      : "teachers";
    q = query(ref(db, "teachers"), orderByChild(path), equalTo(true));
  }

  const snapshot = await getFromDB(q);
  const raw = snapshot.val();
  if (!raw) return { teachers: [], lastKey: null, isEndReached: true };

  const entries = Object.entries(raw);

  const sliced = lastKey ? entries.slice(1) : entries;

  const allTeachers: Teacher[] = sliced.map(
    ([id, value]: [string, TeacherRaw]) => ({
      id,
      ...value,
      avatar_url: value.avatar_url || "/images/defaultAvatar.png",
      languages: value.languages ? Object.keys(value.languages) : [],
      levels: value.levels ? Object.keys(value.levels) : [],
      reviews: value.reviews ? Object.values(value.reviews) : [],
      conditions: value.conditions ? Object.values(value.conditions) : [],
    })
  );

  const filtered = isBackendPagination
    ? allTeachers
    : applyFilters(allTeachers, filters);

  const enableFrontendSort = shouldEnableFrontendSorting(
    filters,
    isBackendPagination,
    isEndReached
  );

  const sorted = enableFrontendSort ? applySort(filtered, sortBy) : filtered;

  const paginated = sorted.slice(0, pageSize);
  const newLastKey = paginated.length > 0 ? paginated.at(-1)!.id : null;

  console.log("🚀 ~ getPaginatedTeachers ~ lastKey:", newLastKey);

  return {
    teachers: paginated,
    lastKey: newLastKey,
    isEndReached: paginated.length < pageSize,
  };
}
