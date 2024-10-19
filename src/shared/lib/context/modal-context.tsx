import { createContext, ReactNode } from "react";

export interface ModalItem {
  content: ReactNode;
  id: number;
}

export interface ModalContextType {
  closeModal: (closeAll?: boolean) => void;
  modals: ModalItem[];
  openModal: (content: ReactNode) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
