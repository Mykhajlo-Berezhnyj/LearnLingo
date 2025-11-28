import { useState, useEffect, useRef } from "react";
import css from "./ThemeSwitcher.module.css";
import { palettes } from "../../db/palettes";
import Button from "../Button";

export default function ThemeSwitcher() {
  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem("palette");
    return saved && palettes[saved] ? saved : "yellow";
  });
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("mode");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("palette", palette);
    localStorage.setItem("mode", mode);
    document.body.className = mode;

    const vars = palettes[palette];
    Object.entries(vars).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
  }, [palette, mode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const paletteKeys = Object.keys(palettes);

  return (
    <div className={css.wrapper} ref={ref}>
      <button className={css.trigger} onClick={() => setOpen(!open)}>
        {mode === "dark" ? "🌙" : "☀️"}
      </button>

      {open && (
        <div className={css.menu}>
          <svg viewBox="0 0 100 100" className={css.svg}>
            {paletteKeys.map((name, i) => {
              const angleStart = ((2 * Math.PI) / paletteKeys.length) * i;
              const angleEnd = ((2 * Math.PI) / paletteKeys.length) * (i + 1);

              const x1 = 50 + 50 * Math.cos(angleStart);
              const y1 = 50 + 50 * Math.sin(angleStart);
              const x2 = 50 + 50 * Math.cos(angleEnd);
              const y2 = 50 + 50 * Math.sin(angleEnd);

              const largeArc = angleEnd - angleStart > Math.PI ? 1 : 0;

              const d = `
                M 50 50
                L ${x1} ${y1}
                A 50 50 0 ${largeArc} 1 ${x2} ${y2}
                Z
              `;

              return (
                <path
                  key={name}
                  d={d}
                  fill={palettes[name]["--color-primary"]}
                  className={css.sector}
                  role="button"
                  aria-label={`Switch to ${name} palette`}
                  onClick={() => setPalette(name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setPalette(name);
                  }}
                >
                  <title>{name}</title>
                </path>
              );
            })}
          </svg>

          <Button
            className={css.innerCircle}
            title="Theme Switcher"
            aria-label="Theme Switcher"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? "🌙" : "☀️"}
          </Button>
        </div>
      )}
    </div>
  );
}
