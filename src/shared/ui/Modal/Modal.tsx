import { useEffect, useRef, MouseEvent } from "react";

import { useModal } from "@/app/providers/modal-provider";

import cn from "classnames";

import { Portal } from "../Portal";

import styles from "./Modal.module.scss";

const modalElement = document.getElementById("modal") as HTMLElement;

// TODO: Нужно придумать стили для Модалки. Предварительно начать изучать БЭМ
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

  // eslint-disable-next-line consistent-return
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
          } else if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      modalRef.current?.addEventListener("keydown", handleTabKey);

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        modalRef.current?.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [modals]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (modals.length === 0) return null;
  const isCloseAll = false;
  const currentModal = modals[modals.length - 1];
  return (
    <Portal element={modalElement}>
      <div className={cn(styles["modal-overlay"])} onClick={handleOverlayClick}>
        <div className={cn(styles.modal)} ref={modalRef} tabIndex={-1}>
          <div className={cn(styles.modal__header)}>
            {isCloseAll ? (
              <button
                className={cn(
                  styles.modal__button,
                  styles["modal__button--close-all"],
                )}
                onClick={() => closeModal(true)}
              >
                Закрыть все
              </button>
            ) : null}
            <button
              className={cn(
                styles.modal__button,
                styles["modal__button--close"],
              )}
              onClick={() => closeModal()}
              ref={closeButtonRef}
            >
              &times;
            </button>
          </div>
          <div className={cn(styles.modal__content)}>
            {currentModal.content}
          </div>
        </div>
      </div>
    </Portal>
  );
};
