import type { Filters } from "../../../types/filters";

export function shouldEnableFrontendSorting(
  filters: Filters,
  isBackendPagination: boolean,
  isEndReached: boolean
): boolean {
  const hasFilters = Object.values(filters).some((v) => v != null);

  return isEndReached && (!isBackendPagination || hasFilters);
}
