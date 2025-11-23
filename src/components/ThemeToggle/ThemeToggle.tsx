import css from "./ThemeToggle.module.css";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      aria-label="theme toggle"
      title={`theme switch - ${theme === "dark" ? "light" : "dark"}`}
      className={css.btnToggle}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
