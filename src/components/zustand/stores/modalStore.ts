import { create } from "zustand";
import { Teacher } from "../../../types/teacher";

export type ModalType = "login" | "register" | "trial" | "authRequired" | null;

interface ModalState {
  modalType: ModalType;
  modalSize: "large" | "small" | null;
  setModalType: (type: ModalType, size?: "large" | "small") => void;
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalSize: "large",
  selectedTeacher: null,
  setModalType: (type, size = "large") =>
    set({ modalType: type, modalSize: size }),
  setSelectedTeacher: (teacher: Teacher) => set({ selectedTeacher: teacher }),
  closeModal: () => set({ modalType: null, modalSize: "large" }),
}));
