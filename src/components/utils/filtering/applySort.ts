import type { Teacher } from "../../../types/teacher";

export function applySort(
  list: Teacher[],
  sortBy: "rating" | "price"
): Teacher[] {
  return [...list].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return a.price_per_hour - b.price_per_hour;
  });
}
