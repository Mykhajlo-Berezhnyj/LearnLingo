import Button from "../Button";
import { useAuthStore } from "../../zustand/stores/authStore";
import { useModalStore } from "../../zustand/stores/modalStore";
import Modal from "../../Modal/Modal";
import { renderModalContent } from "../../utils/renderModalContent";
import { Teacher } from "../../../types/teacher";

export default function BtnTrialLesson({
  className,
  teacher,
}: {
  className?: string;
  teacher: Teacher;
}) {
  const user = useAuthStore((store) => store.user);
  const { modalType, modalSize, setModalType, closeModal, setSelectedTeacher } =
    useModalStore();

  return (
    <>
      <Button
        color={"btnPrimary"}
        className={className}
        aria-label="Book Trial Lesson"
        onClick={() => {
          setModalType(user ? "trial" : "authRequired", user ? "large" : null);
          setSelectedTeacher(teacher);
        }}
      >
        Book trial lesson
      </Button>
      <Modal isOpen={!!modalType} onClose={closeModal} size={modalSize}>
        {renderModalContent(modalType)}
      </Modal>
    </>
  );
}
