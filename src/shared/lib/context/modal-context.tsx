import {createContext, ReactNode} from "react";

export interface ModalItem {
    id: number;
    content: ReactNode;
}

export interface ModalContextType {
    openModal: (content: ReactNode) => void;
    closeModal: (closeAll?: boolean) => void;
    modals: ModalItem[];
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
