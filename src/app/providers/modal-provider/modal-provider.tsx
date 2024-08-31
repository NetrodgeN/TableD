import { ReactNode, useContext, useState } from "react";
import {
  ModalContext,
  ModalItem,
} from "@/shared/lib/context/modal-context.tsx";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = (content: ReactNode) => {
    setModals((prevModals) => [...prevModals, { id: Date.now(), content }]);
  };

  const closeModal = (closeAll: boolean = false) => {
    if (closeAll) {
      setModals([]);
    } else {
      setModals((prevModals) => prevModals.slice(0, -1));
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modals }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
