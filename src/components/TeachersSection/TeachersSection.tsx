import css from "./TeachersSection.module.css";
import Button from "../Button/Button";
import TeachersList from "../TeachersList/TeachersList";
import type { Teacher } from "../../types/teacher";
import Container from "../Container/Container";
import Loader from "../Loader/Loader";
import { teachersStore } from "../zustand/stores/teachers";

interface Props {
  className?: string;
  teachers: Teacher[];
  status: string;
  isEndReached: boolean;
  page: number;
  totalCount: number | null;
  onLoadMore: () => void;
  emptyMessage?: string;
}

export default function TeachersSection({
  className,
  teachers,
  status,
  isEndReached,
  onLoadMore,
  totalCount,
  emptyMessage = "No teachers found.",
}: Props) {
  return (
    <section className={className}>
      <Container className={css.teacherContainer}>
        {teachers.length > 0 && (
          <TeachersList teachers={teachers} className={css.teachersList} />
        )}
        {status === "loading" && <Loader />}
        {!isEndReached && status === "succeeded" && teachers.length > 0 && (
          <Button
            className={css.loadMoreBtn}
            color="btnPrimary"
            onClick={onLoadMore}
          >
            Load more
          </Button>
        )}

        {isEndReached && teachers.length > 0 && (
          <p className={css.endMessage}>No more teachers available.</p>
        )}
        {status === "succeeded" && totalCount === null && (
          <p>No favorites for you</p>
        )}
        {status === "succeeded" && teachers.length === 0 && (
          <p className={css.emptyMessage}>{emptyMessage}</p>
        )}
        {status === "failed" && (
          <p className={css.errorMessage}>Something went wrong…</p>
        )}
      </Container>
    </section>
  );
}
