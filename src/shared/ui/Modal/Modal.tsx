import { useModal } from "@/app/providers/modal-provider";
import cn from "classnames";
import { useEffect, useRef } from "react";

import { Portal } from "../Portal";
import styles from "./Modal.module.scss";

const modalElement = document.getElementById("modal") as HTMLElement;

export const Modal = () => {
  const { closeModal, modals } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    if (modals.length > 0) {
      closeButtonRef.current?.focus();

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      modalRef.current?.addEventListener("keydown", handleTabKey);

      return () => {
        modalRef.current?.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [modals]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (modals.length === 0) return null;

  const currentModal = modals[modals.length - 1];
  return (
    <Portal element={modalElement}>
      <div className={cn(styles["modal-overlay"])} onClick={handleOverlayClick}>
        <div className={cn(styles["modal"])} ref={modalRef} tabIndex={-1}>
          <div className={cn(styles["modal__header"])}>
            <button
              className={cn(
                styles["modal__button"],
                styles["modal__button--close-all"],
              )}
              onClick={() => closeModal(true)}
            >
              Закрыть все
            </button>
            <button
              className={cn(
                styles["modal__button"],
                styles["modal__button--close"],
              )}
              onClick={() => closeModal()}
              ref={closeButtonRef}
            >
              &times;
            </button>
          </div>
          <div className={cn(styles["modal__content"])}>
            {currentModal.content}
          </div>
        </div>
      </div>
    </Portal>
  );
};
