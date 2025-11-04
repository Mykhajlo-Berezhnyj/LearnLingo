import Button from "../Button";
import css from "./BtnTrialLesson.module.css";
import { useAuthStore } from "../../zustand/stores/authStore";
import { useModalStore } from "../../zustand/stores/modalStore";
import Modal from "../../Modal/Modal";
import { renderModalContent } from "../../utils/renderModalContent";

export default function BtnTrialLesson({ className }: { className?: string }) {
  const user = useAuthStore((store) => store.user);
  const { modalType, setModalType, closeModal } = useModalStore();

  //   if (user === null) {
  //     setModalType("authRequired");
  //     return;
  //   }

  return (
    <>
      <Button
        color={"btnPrimary"}
        className={className}
        aria-label="Book Trial Lesson"
        onClick={() => setModalType(user ? "trial" : "authRequired")}
      >
        Book trial lesson
      </Button>
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {renderModalContent(modalType)}
      </Modal>
    </>
  );
}
