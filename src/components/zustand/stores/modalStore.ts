import { create } from "zustand";

export type ModalType = "login" | "register" | null;

interface ModalState {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  setModalType: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}));
