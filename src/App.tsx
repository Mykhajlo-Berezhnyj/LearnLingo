import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import { Toaster } from "react-hot-toast";
import { useInitFavorites } from "./components/utils/useInitFavorites";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const Teachers = lazy(() => import("./page/Teachers/Teachers"));
const Favorites = lazy(() => import("./page/Favorites/Favorites"));

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  useInitFavorites();

  return (
    <>
      <AppBar className="header" theme={theme} setTheme={setTheme} />

      <Suspense fallback={<Loader className="fallbackLoader" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;
