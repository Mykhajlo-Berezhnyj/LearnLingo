import css from "./TeachersList.module.css";
import Button from "../Button/Button";
import TeacherCard from "../TeacherCard/TeacherCard";
import type { Teacher } from "../../types/teacher";

interface Props {
  className?: string;
  teachers: Teacher[];
  isLoading: boolean;
  isEndReached: boolean;
  page: number;
  onLoadMore: (nextPage: number) => void;
  emptyMessage?: string;
}

export default function TeachersList({
  className,
  teachers,
  isLoading,
  isEndReached,
  page,
  onLoadMore,
  emptyMessage = "No teachers found.",
}: Props) {
  return (
    <section className={className}>
      <ul className={css.teachersList}>
        {teachers.map((teacher) => {
          return (
            <li key={teacher.id} className={css.teacherItem}>
              <TeacherCard teacher={teacher} />
            </li>
          );
        })}
      </ul>

      {isLoading && <p className={css.loader}>Loading...</p>}

      {!isEndReached && !isLoading && (
        <Button
          className={css.loadMoreBtn}
          color="btnPrimary"
          onClick={() => onLoadMore(page + 1)}
          disabled={isLoading}
        >
          Load more
        </Button>
      )}

      {isEndReached && teachers.length > 0 && (
        <p className={css.endMessage}>No more teachers available.</p>
      )}

      {isEndReached && teachers.length === 0 && (
        <p className={css.emptyMessage}>{emptyMessage}</p>
      )}
    </section>
  );
}
