import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard";
import type { Teacher } from "../../types/teacher";

interface Props {
  teachers: Teacher[];
  className?: string;
}

export default function TeachersList({ teachers, className }: Props) {
  return (
    <ul className={className}>
      {teachers.map((teacher) => {
        return (
          <li key={teacher.id} className={css.teacherCard}>
            <TeacherCard teacher={teacher} />
          </li>
        );
      })}
    </ul>
  );
}
