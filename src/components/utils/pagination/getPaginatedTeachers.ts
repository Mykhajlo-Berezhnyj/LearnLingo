import {
  getDatabase,
  ref,
  query,
  orderByKey,
  orderByChild,
  equalTo,
  limitToFirst,
  startAt,
  endAt,
  get as getFromDB,
} from "firebase/database";
import type { Filters } from "../../../types/filters";
import type { TeacherRaw, Teacher } from "../../../types/teacher";
import { applyFilters } from "../filtering/applyFilters";

interface PaginatedResult {
  teachers: Teacher[];
  lastKey: string | null;
  isEndReached: boolean;
  totalCount: number;
}

function pickBestBackendFilter(
  filters: Filters
): [string, string | number] | null {
  const priority: (keyof Filters)[] = ["language", "level", "price_per_hour"];
  const entries = Object.entries(filters).filter(([_, v]) => v != null) as [
    string,
    string | number
  ][];

  for (const k of priority) {
    const found = entries.find(([key]) => key === k);
    if (found) return found;
  }
  return entries.length > 0 ? entries[0] : null;
}

export async function getPaginatedTeachers(
  filters: Filters,
  lastKey: string | null = null,
  pageSize = 4
): Promise<PaginatedResult> {
  const db = getDatabase();
  const activeFilters = Object.entries(filters).filter(([_, v]) => v != null);
  let q;
  let totalCount = 0;
  const hasNoFilters = activeFilters.length === 0;
  // const hasSingleFilter = activeFilters.length === 1;

  const fetchLimit = pageSize + 1;

  if (hasNoFilters) {
    q = lastKey
      ? query(
          ref(db, "teachers"),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(fetchLimit)
        )
      : query(ref(db, "teachers"), orderByKey(), limitToFirst(fetchLimit));
    const countSnap = await getFromDB(query(ref(db, "teachers")));

    totalCount = countSnap.size;
  } else {
    const primary = pickBestBackendFilter(filters);
    if (!primary) {
      q = query(ref(db, "teachers"), orderByKey(), limitToFirst(fetchLimit));
    } else {
      const [key, value] = primary;
      let path;
      if (key === "language") {
        path = `languages/${value}`;
        q = query(ref(db, "teachers"), orderByChild(path), equalTo(true));
      } else if (key === "level") {
        path = `levels/${value}`;
        q = query(ref(db, "teachers"), orderByChild(path), equalTo(true));
      } else if (key === "price_per_hour") {
        path = "price_per_hour";
        q = query(ref(db, "teachers"), orderByChild(path), endAt(value));
      } else
        q = query(ref(db, "teachers"), orderByKey(), limitToFirst(fetchLimit));
    }
  }
  const snapshot = await getFromDB(q);

  const raw = snapshot.val();
  if (!raw)
    return { teachers: [], lastKey: null, isEndReached: true, totalCount };

  let entries = Object.entries(raw);
  if (hasNoFilters && lastKey) {
    entries = entries.slice(1);
  }

  const allTeachers: Teacher[] = entries.map(
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

  const filtered = hasNoFilters
    ? allTeachers
    : applyFilters(allTeachers, filters);

  totalCount = hasNoFilters ? totalCount : filtered.length;

  if (hasNoFilters) {
    const paginated = filtered.slice(0, pageSize);
    const newLastKey = paginated.length > 0 ? paginated.at(-1)!.id : null;

    const isEndReached = paginated.length < pageSize;

    return {
      teachers: paginated,
      lastKey: newLastKey,
      isEndReached,
      totalCount,
    };
  } else {
    return {
      teachers: filtered,
      lastKey: null,
      isEndReached: true,
      totalCount,
    };
  }
}
