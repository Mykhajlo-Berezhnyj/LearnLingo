import { useEffect } from "react";
import { usePaginatedTeachersStore } from "../zustand/stores/teachers";
import TeacherCard from "../TeacherCard/TeacherCard ";
import css from "./TeachersList.module.css";
import Button from "../Button/Button";

export default function TeachersList({ className }: { className: string }) {
  const { teachers, isLoading, isEndReached, loadInitial, loadMore } =
    usePaginatedTeachersStore();

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <section className={className}>
      <ul className={css.teachersList}>
        {teachers.map((teacher) => (
          <li key={teacher.id} className={css.teacherItem}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {isLoading && <p className={css.loader}>Loading...</p>}

      {!isEndReached && !isLoading && (
        <Button
          className={css.loadMoreBtn}
          color={"btnPrimary"}
          onClick={loadMore}
          disabled={isLoading}
        >
          Load more
        </Button>
      )}

      {isEndReached && teachers.length > 0 && (
        <p className={css.endMessage}>No more teachers available.</p>
      )}
    </section>
  );
}
