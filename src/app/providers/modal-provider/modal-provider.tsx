import {
  ModalContext,
  ModalItem,
} from "@/shared/lib/context/modal-context.tsx";
import {
  ReactNode,
  useContext,
  useState
} from "react";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = (content: ReactNode) => {
    setModals((prevModals) => [...prevModals, { content, id: Date.now() }]);
  };

  const closeModal = (closeAll: boolean = false) => {
    if (closeAll) {
      setModals([]);
    } else {
      setModals((prevModals) => prevModals.slice(0, -1));
    }
  };

  return (
    <ModalContext.Provider value={{ closeModal, modals, openModal }}>
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
