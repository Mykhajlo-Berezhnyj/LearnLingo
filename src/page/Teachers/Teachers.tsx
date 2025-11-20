import { useEffect } from "react";
import TeachersSection from "../../components/TeachersSection/TeachersSection";
import css from "./Teachers.module.css";
import { usePaginatedTeachersStore } from "../../components/zustand/stores/teachers";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

export default function Teachers() {
  const {
    getVisibleTeachers,
    isLoading,
    isEndReached,
    page,
    resetTeachers,
    loadTeachers,
    loadMore,
    clearFilters,
    filters,
  } = usePaginatedTeachersStore();

  useEffect(() => {
    resetTeachers();
    clearFilters();
  }, []);

  useEffect(() => {
    loadTeachers(1);
  }, [filters]);

  return (
    <div className={css.teachersPage}>
      <FilterPanel />
      <TeachersSection
        className={css.teachers}
        teachers={getVisibleTeachers()}
        isLoading={isLoading}
        isEndReached={isEndReached}
        page={page}
        onLoadMore={loadMore}
      />
    </div>
  );
}
