import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const mSeconds = 500;
  const [count, setCount] = useState(mSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 10);
    return () => clearInterval(timer);
  }, []);

  const percentage = ((mSeconds - count) / mSeconds) * 100;

  return (
    <div
      className={css.notFound}
      style={{
        background: `conic-gradient(
          black ${percentage}%,
          red ${percentage}% 100%
        )`,
      }}
    >
      <h2 className={css.err}>404</h2>
      <h2 className={css.err}>Not Fount Page</h2>
      <p className={css.txt}>Redirect {(count / 100).toFixed(2)} seconds </p>
    </div>
  );
}
