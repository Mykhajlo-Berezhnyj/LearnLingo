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
}

export async function getPaginatedTeachers(
  filters: Filters,
  lastKey: string | null = null,
  pageSize = 4
): Promise<PaginatedResult> {
  const db = getDatabase();
  const activeFilters = Object.entries(filters).filter(([_, v]) => v != null);
  let q;
  const hasNoFilters = activeFilters.length === 0;
  // const hasSingleFilter = activeFilters.length === 1;

  if (hasNoFilters) {
    q = lastKey
      ? query(
          ref(db, "teachers"),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(ref(db, "teachers"), orderByKey(), limitToFirst(pageSize));
  } else {
    const [key, value] = activeFilters[0];
    let path;
    if (key === "language") {
      path = `languages/${value}`;
      q = query(ref(db, "teachers"), orderByChild(path), equalTo(true));
    } else if (key === "level") {
      path = `levels/${value}`;
      q = query(ref(db, "teachers"), orderByChild(path), equalTo(true));
    } else if (key === "price_per_hour") {
      path = "price_per_hour";
      q = query(
        ref(db, "teachers"),
        orderByChild("price_per_hour"),
        endAt(value)
      );
    }
  }

  const snapshot = await getFromDB(q);
  const raw = snapshot.val();
  if (!raw) return { teachers: [], lastKey: null, isEndReached: true };

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

  if (hasNoFilters) {
    const paginated = filtered.slice(0, pageSize);
    const newLastKey = paginated.length > 0 ? paginated.at(-1)!.id : null;
    const isEndReached = paginated.length < pageSize;
    return {
      teachers: paginated,
      lastKey: newLastKey,
      isEndReached,
    };
  } else {
    return {
      teachers: filtered,
      lastKey: null,
      isEndReached: true,
    };
  }
}
