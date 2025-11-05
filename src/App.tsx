import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import { Toaster } from "react-hot-toast";
import { useInitFavorites } from "./components/utils/useInitFavorites";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const Teachers = lazy(() => import("./page/Teachers/Teachers"));
const Favorites = lazy(() => import("./page/Favorites/Favorites"));

function App() {
  useInitFavorites();

  return (
    <>
      <AppBar className="header" />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
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
