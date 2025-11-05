import css from "./TeachersSection.module.css";
import Button from "../Button/Button";
import TeachersList from "../TeachersList/TeachersList";
import type { Teacher } from "../../types/teacher";
import Container from "../Container/Container";

interface Props {
  className?: string;
  teachers: Teacher[];
  isLoading: boolean;
  isEndReached: boolean;
  page: number;
  onLoadMore: (nextPage: number) => void;
  emptyMessage?: string;
}

export default function TeachersSection({
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
      <Container className={css.teacherContainer}>
        <TeachersList teachers={teachers} className={css.teachersList} />
        {isLoading && <p className={css.loader}>Loading...</p>}
        {!isEndReached && !isLoading && teachers.length > 0 && (
          <Button
            className={css.loadMoreBtn}
            color="btnPrimary"
            onClick={() => onLoadMore(page + 1)}
          >
            Load more
          </Button>
        )}

        {isEndReached && teachers.length > 0 && (
          <p className={css.endMessage}>No more teachers available.</p>
        )}

        {!isLoading && teachers.length === 0 && (
          <p className={css.emptyMessage}>{emptyMessage}</p>
        )}
      </Container>
    </section>
  );
}
