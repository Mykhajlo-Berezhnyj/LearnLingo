import type { Teacher } from "../../../types/teacher";
import type { Filters } from "../../../types/filters";

export function applyFilters(list: Teacher[], filters: Filters): Teacher[] {
  return list.filter((teacher) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value == null) return true;

      switch (key) {
        case "language":
          return teacher.languages?.includes(value as string);
        case "level":
          return teacher.levels?.includes(value as string);
        case "price_per_hour":
          return Number(teacher.price_per_hour) <= Number(value);
        default:
          return true;
      }
    });
  });
}
