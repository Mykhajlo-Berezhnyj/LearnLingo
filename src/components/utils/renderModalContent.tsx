import BookTrialLessonForm from "../BookTrialLessonForm/BookTrialLessonForm";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegisterForm/RegisterForm";
import type { ModalType } from "../zustand/stores/modalStore";
import AthRequired from "../authRequired/authRequired.";

export function renderModalContent(modalType: ModalType) {
  switch (modalType) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegistrationForm />;
    case "trial":
      return <BookTrialLessonForm />;
    case "authRequired":
      return <AthRequired />;
    default:
      return null;
  }
}
