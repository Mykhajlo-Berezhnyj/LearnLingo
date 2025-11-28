import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  size?: "large" | "small";
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  size = "large",
  isOpen,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={clsx(css.modalContent, size === "large" && css.large)}>
        <button onClick={onClose} className={css.btnClose}>
          <Icon iconName="close-x-icon" className={css.iconClose} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
