import { ReactNode, useCallback, useContext, useMemo, useState } from "react";

import {
  ModalContext,
  ModalItem,
} from "@/shared/lib/context/modal-context.tsx";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = useCallback((content: ReactNode) => {
    setModals((prevModals) => [...prevModals, { content, id: Date.now() }]);
  }, []);

  const closeModal = useCallback((closeAll: boolean = false) => {
    if (closeAll) {
      setModals([]);
    } else {
      setModals((prevModals) => prevModals.slice(0, -1));
    }
  }, []);

  const value = useMemo(
    () => ({
      closeModal,
      modals,
      openModal,
    }),
    [closeModal, modals, openModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
