import BookTrialLessonForm from "../BookTrialLessonForm/BookTrialLessonForm";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegisterForm/RegisterForm";
import { ModalType } from "../zustand/stores/modalStore";
import AthRequired from "../AthRequired/AthRequired";

export function renderModalContent(modalType: ModalType) {
  if (!modalType) return null;

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
