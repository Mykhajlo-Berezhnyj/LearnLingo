import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegisterForm/RegisterForm";
import type { ModalType } from "../zustang/store/modalStore";

export function renderModalContent(modalType: ModalType) {
  switch (modalType) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegistrationForm />;
    default:
      return null;
  }
}
