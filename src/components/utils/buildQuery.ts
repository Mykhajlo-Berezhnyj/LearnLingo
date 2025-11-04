import {
  getDatabase,
  ref,
  query,
  orderByKey,
  orderByChild,
  equalTo,
  endAt,
  startAt,
  limitToFirst,
} from "firebase/database";
import type { Filters } from "../../types/filters";

export function buildQuery(
  filters: Filters,
  lastKey: string | null = null,
  pageSize = 4,
  isBackendPagination = true
) {
  const db = getDatabase();
  const activeFilters = Object.entries(filters).filter(([_, v]) => v != null);
  const singleFilterKey =
    activeFilters.length === 1 ? activeFilters[0][0] : null;

  if (!isBackendPagination) {
    return query(ref(db, "teachers"), orderByKey());
  }

  if (activeFilters.length === 0) {
    return lastKey
      ? query(
          ref(db, "teachers"),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(ref(db, "teachers"), orderByKey(), limitToFirst(pageSize));
  }

  if (singleFilterKey === "language") {
    return lastKey
      ? query(
          ref(db, "teachers"),
          orderByChild(`languages/${filters.language}`),
          equalTo(true),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(
          ref(db, "teachers"),
          orderByChild(`languages/${filters.language}`),
          equalTo(true),
          limitToFirst(pageSize)
        );
  }

  if (singleFilterKey === "level") {
    return lastKey
      ? query(
          ref(db, "teachers"),
          orderByChild(`levels/${filters.level}`),
          equalTo(true),
          startAt(lastKey),
          limitToFirst(pageSize + 1)
        )
      : query(
          ref(db, "teachers"),
          orderByChild(`levels/${filters.level}`),
          equalTo(true),
          limitToFirst(pageSize)
        );
  }

  return query(ref(db, "teachers"), orderByKey(), limitToFirst(pageSize));
}
