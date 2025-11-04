import type { Filters } from "../../../types/filters";

export function shouldShowSortControls(
  filters: Filters,
  isEndReached: boolean
): boolean {
  const hasFilters = Object.values(filters).some((v) => v != null);
  return !hasFilters || isEndReached;
}
