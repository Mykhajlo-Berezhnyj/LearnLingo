import TeachersSection from "../../components/TeachersSection/TeachersSection";
import css from "./Teachers.module.css";
import { teachersStore } from "../../components/zustand/stores/teachers";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { useEffect, useRef } from "react";

export default function Teachers() {
  const {
    getVisibleTeachers,
    status,
    isEndReached,
    page,
    resetTeachers,
    loadTeachers,
    loadMore,
    initFromUrl,
    filters,
    totalCount,
  } = teachersStore();

  const isFirstMount = useRef(true);

  useEffect(() => {
    resetTeachers();
    if (isFirstMount.current) {
      isFirstMount.current = false;
      const params = new URLSearchParams(window.location.search);
      initFromUrl(params);
    }
    loadTeachers();
  }, [filters]);

  return (
    <div className={css.teachersPage}>
      <FilterPanel totalCount={totalCount} />
      <TeachersSection
        className={css.teachers}
        teachers={getVisibleTeachers()}
        status={status}
        isEndReached={isEndReached}
        page={page}
        totalCount={totalCount}
        onLoadMore={loadMore}
      />
    </div>
  );
}
