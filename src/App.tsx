import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import { Toaster } from "react-hot-toast";
import { useInitFavorites } from "./components/utils/useInitFavorites";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import { useModalStore } from "./components/zustand/stores/modalStore";
import { renderModalContent } from "./components/utils/renderModalContent";
import Modal from "./components/Modal/Modal";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const Teachers = lazy(() => import("./page/Teachers/Teachers"));
const Favorites = lazy(() => import("./page/Favorites/Favorites"));

function App() {
  const { modalType, modalSize, closeModal } = useModalStore();
  useInitFavorites();

  return (
    <>
      <AppBar className="header" />

      <Suspense fallback={<Loader className="fallbackLoader" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
      <Modal isOpen={!!modalType} onClose={closeModal} size={modalSize}>
        {renderModalContent(modalType)}
      </Modal>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
              padding: "20px",
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
