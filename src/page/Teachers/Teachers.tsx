import { useEffect } from "react";
import TeachersList from "../../components/TeachersList/TeachersList";
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
    <TeachersList
      className={css.teachers}
      teachers={teachers}
      isLoading={isLoading}
      isEndReached={isEndReached}
      page={page}
      onLoadMore={loadTeachers}
    />
  );
}
