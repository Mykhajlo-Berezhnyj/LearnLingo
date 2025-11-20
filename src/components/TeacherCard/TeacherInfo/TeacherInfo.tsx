import { Teacher } from "../../../types/teacher";
import css from "./TeacherInfo.module.css";

type TeacherProps = {
  teacher: Teacher;
  className: string;
};

export default function TeacherInfo({ teacher, className }: TeacherProps) {
  return (
    <figure className={className}>
      <div className={css.thumb}>
        <img
          className={css.avatarTeacher}
          src={teacher.avatar_url}
          alt={`Photo of ${teacher.name} ${teacher.surname}`}
        />
      </div>
      <figcaption className={css.info}>
        <p className={css.teacherLabel}>Your teacher</p>
        <p className={css.teacherName}>
          {teacher.name} {teacher.surname}
        </p>
      </figcaption>
    </figure>
  );
}
