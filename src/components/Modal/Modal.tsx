import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button onClick={onClose} className={css.btnClose}>
          <Icon iconName="close-x-icon" className={css.iconClose} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
