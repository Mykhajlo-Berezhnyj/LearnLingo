import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const Teachers = lazy(() => import("./page/Teachers/Teachers"));
const TeacherDetails = lazy(
  () => import("./components/TeacherDetails/TeacherDetails")
);

function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />}>
            <Route path=":id" element={<TeacherDetails />} />
          </Route>
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
