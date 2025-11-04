import BookTrialLessonForm from "../BookTrialLessonForm/BookTrialLessonForm";
import Button from "../Button/Button";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegisterForm/RegisterForm";
import { useModalStore } from "../zustand/stores/modalStore";
import type { ModalType } from "../zustang/store/modalStore";
import css from "../AuthMenu/AuthMenu.module.css";

export function renderModalContent(modalType: ModalType) {
  const setModalType = useModalStore.getState().setModalType;

  switch (modalType) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegistrationForm />;
    case "trial":
      return <BookTrialLessonForm />;
    case "authRequired":
      return (
        <div className={css.authRequired}>
          <h3>Authorization Required</h3>
          <p>This feature is available only to authorized users.</p>
          <div className={css.authButtons}>
            <Button onClick={() => setModalType("login")}>Log In</Button>
            <Button onClick={() => setModalType("register")}>Sign Up</Button>
          </div>
        </div>
      );
    default:
      return null;
  }
}
