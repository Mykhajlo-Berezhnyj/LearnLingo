import type { Teacher } from "../../../types/teacher";
import Icon from "../../Icon/Icon";
import css from "./TeacherCardMore.module.css";

export default function TeacherCardMore({
  className,
  teacher,
}: {
  className?: string;
  teacher: Teacher;
}) {
  return (
    <section className={className}>
      <h3 className={css["visually-hidden"]}>Teacher details</h3>
      <p>{teacher.experience}</p>

      <ul className={css.reviewsList}>
        {teacher.reviews.map((r, index) => (
          <li key={index} className={css.reviewItem}>
            <div className={css.reviewerInfo}>
              <div className={css.reviewerThumb}>
                {r.reviewer_avatar ? (
                  <img
                    src={r.reviewer_avatar}
                    alt={r.reviewer_name}
                    className={css.avatar}
                  />
                ) : (
                  <div className={css.avatarPlaceholder}>
                    {r.reviewer_name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div className={css.reviewerWrap}>
                <p className={css.reviewerName}>{r.reviewer_name}</p>
                <span className={css.rating}>
                  <Icon iconName="icon-star" size={16} /> {r.reviewer_rating}
                </span>
              </div>
            </div>
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
