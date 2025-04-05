"use client";
// next
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type PopupContext = {
  isOpen: boolean;
  showPopup: () => void;
  hidePopup: () => void;
};

const popupContext = createContext({} as PopupContext);

export const usePopup = () => useContext(popupContext);

export default function PopupProvider({ children }: { children: ReactNode }) {
  // state for switching the visibility of popup
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // function for showing popup
  const showPopup = () => setIsOpen(true);

  // function for hiding popup
  const hidePopup = () => setIsOpen(false);

  return (
    <popupContext.Provider value={{ isOpen, showPopup, hidePopup }}>
      {children}
    </popupContext.Provider>
  );
}
