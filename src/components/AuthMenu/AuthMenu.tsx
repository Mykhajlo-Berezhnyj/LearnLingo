import BtnLogInOut from "../Button/BtnLogInOut/BtnLogInOut";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { renderModalContent } from "../utils/renderModalContent";
import { useModalStore } from "../zustand/stores/modalStore";
import css from "./AuthMenu.module.css";

export default function AuthMenu() {
  const { modalType, setModalType, closeModal } = useModalStore();
  return (
    <>
      <ul className={css.btnWrapper}>
        <li>
          <BtnLogInOut onClick={() => setModalType("login")} />
        </li>
        <li>
          <Button
            className={css.btnRegister}
            onClick={() => setModalType("register")}
          >
            Registration
          </Button>
        </li>
      </ul>
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {renderModalContent(modalType)}
      </Modal>
    </>
  );
}
