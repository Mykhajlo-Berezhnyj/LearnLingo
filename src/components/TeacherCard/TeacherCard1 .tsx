import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import css from "./TeacherCard.module.css"; // ❗ без пробілу у назві файлу
import TeacherCardMore from "./TeacherCardMore/TeacherCardMore";

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // дефолтна аватарка

  return (
    <article className={css.teacherCard}>
      <header className={css.headerCard}>
        <div className={css.thumb}>
          <img
            src={teacher.avatar_url || defaultAvatar}
            alt={`Photo of ${teacher.name}`}
            className={css.teacherAvatar}
          />
        </div>

        <div className={css.headerInfo}>
          <p className={css.textHero}>Languages</p>
          <h3 className={css.titleHero}>
            {teacher.name} {teacher.surname}
          </h3>

          <dl className={css.statInfoList}>
            <div className={css.statInfoItem}>
              <Icon iconName="book" size={16} />
              <dt>Lessons done:</dt>
              <dd>{teacher.lessons_done}</dd>
            </div>

            <div className={css.statInfoItem}>
              <Icon iconName="star" size={16} />
              <dt>Rating:</dt>
              <dd>{teacher.rating}</dd>
            </div>

            <div className={css.statInfoItem}>
              <Icon iconName="coin" size={16} />
              <dt>Price / hour:</dt>
              <dd className={css.statinfoPrice}>${teacher.price_per_hour}</dd>
            </div>
          </dl>

          <Button
            aria-label="Add to favorites"
            className={css.btnFavorite}
            color="btnSecondary"
          />
        </div>
      </header>

      <section className={css.cardBody}>
        <dl className={css.baseInfo}>
          <dt className={css.baseInfoDt}>Speaks:</dt>
          <dd className={css.baseInfoDdLanguages}>
            {teacher.languages?.join(", ")}
          </dd>

          <dt className={css.baseInfoDt}>Lesson Info:</dt>
          <dd className={css.baseInfoDd}>{teacher.lesson_info}</dd>

          <dt className={css.baseInfoDt}>Conditions:</dt>
          <dd className={css.baseInfoDd}>{teacher.conditions}</dd>
        </dl>

        {isExpanded ? (
          <TeacherCardMore teacher={teacher} />
        ) : (
          <Button
            className={css.linkMore}
            onClick={() => setIsExpanded(true)}
            variant="link"
          >
            Read more
          </Button>
        )}
      </section>

      <footer>
        <ul className={css.levelList}>
          {teacher.levels.map((level, index) => (
            <li key={index}>{level}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
