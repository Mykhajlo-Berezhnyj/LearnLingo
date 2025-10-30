import { useState } from "react";
import { Teacher } from "../../types/teacher";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import css from "./TeacherCard.module.css";
import TeacherCardMore from "./TeacherCardMore/TeacherCardMore";

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={css.teacherCard}>
      <div className={css.thumb}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={css.teacherAvatar}
        />
      </div>
      <div className={css.cardWrap}>
        <div className={css.blocks}>
          <div className={css.block}>
            <header className={css.headerCard}>
              <div className={css.headerInfo}>
                <p className={css.textheader}>Languages</p>
                <h3 className={css.titleheader}>
                  {teacher.name} {teacher.surname}
                </h3>
              </div>

              <ul className={css.statInfoList}>
                <li className={css.statInfoItem}>
                  <Icon className="css.book" iconName={"book"} size={16} />
                  <p className={css.statinfoText}>Lessons online</p>
                </li>
                <li className={css.statInfoItem}>
                  <p className={css.statinfoText}>
                    Lessons done: {teacher.lessons_done}
                  </p>
                </li>
                <li className={css.statInfoItem}>
                  <Icon iconName={"star"} size={16} />
                  <p className={css.statinfoText}> Rating: {teacher.rating}</p>
                </li>
                <li className={css.statInfoItem}>
                  <p className={css.statinfoPrice}>
                    Price / 1 hour: {teacher.price_per_hour}
                  </p>
                </li>
              </ul>
              <Button className={css.btnFavorit} />
            </header>
            <dl className={css.baseInfo}>
              <div className={css.rowInfo}>
                <dt className={css.baseInfoDt}>Speaks:</dt>
                <dd className={css.baseInfoDdLanguages}>
                  {teacher.languages?.join(", ")}
                </dd>
              </div>

              <div className={css.rowInfo}>
                <dt className={css.baseInfoDt}>Lesson Info:</dt>
                <dd className={css.baseInfoDd}>{teacher.lesson_info}</dd>
              </div>

              <div className={css.rowInfo}>
                <dt className={css.baseInfoDt}>Conditions:</dt>
                <dd className={css.baseInfoDd}>{teacher.conditions}</dd>
              </div>
            </dl>
          </div>
          {isExpanded ? (
            <TeacherCardMore teacher={teacher} className={css.readMore} />
          ) : (
            <Button
              className={css.linkMore}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </Button>
          )}
        </div>
        <ul className={css.levelList}>
          {teacher.levels.map((level, index) => (
            <li key={index} className={css.levelItem}>
              #{level}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
