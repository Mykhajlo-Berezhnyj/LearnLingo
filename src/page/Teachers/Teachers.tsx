import { useEffect } from "react";
import TeachersSection from "../../components/TeachersSection/TeachersSection";
import css from "./Teachers.module.css";
import { usePaginatedTeachersStore } from "../../components/zustand/stores/teachers";

export default function Teachers() {
  const {
    teachers,
    isLoading,
    isEndReached,
    page,
    resetTeachers,
    loadTeachers,
  } = usePaginatedTeachersStore();
  useEffect(() => {
    resetTeachers();
    loadTeachers();
  }, []);

  return (
    <TeachersSection
      className={css.teachers}
      teachers={teachers}
      isLoading={isLoading}
      isEndReached={isEndReached}
      page={page}
      onLoadMore={loadTeachers}
    />
  );
}
