import BtnLogInOut from "../Button/BtnLogInOut/BtnLogInOut";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { renderModalContent } from "../utils/renderModalContent";
import { useModalStore } from "../zustand/stores/modalStore";
import css from "./AuthMenu.module.css";

type AuthMenuProps = {
  className?: string;
  onCloseMenu?: () => void;
};

export default function AuthMenu({ className, onCloseMenu }: AuthMenuProps) {
  const { modalType, setModalType, closeModal } = useModalStore();
  return (
    <div className={className}>
      <ul className={css.btnWrapper}>
        <li>
          <BtnLogInOut
            onClick={() => {
              setModalType("login");
              onCloseMenu();
            }}
          />
        </li>
        <li>
          <Button
            className={css.btnRegister}
            onClick={() => {
              setModalType("register");
              onCloseMenu();
            }}
          >
            Registration
          </Button>
        </li>
      </ul>
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {renderModalContent(modalType)}
      </Modal>
    </div>
  );
}
