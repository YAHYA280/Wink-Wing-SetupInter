"use client";
// next
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type CheckboxContext = {
  checkboxes: Record<string, boolean>;
  toggleCheck: (id: string) => void;
};

const checkboxContext = createContext({} as CheckboxContext);

export const useCheckbox = () => useContext(checkboxContext);

export default function CheckboxProvider({
  children,
}: {
  children: ReactNode;
}) {
  // state showing is the button currently checked
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});

  // saving and getting the state of buttons in localstorage
  useEffect(() => {
    const savedBtnState = localStorage.getItem("checkboxes");
    if (savedBtnState) return setCheckboxes(JSON.parse(savedBtnState));
  }, []);

  useEffect(
    () => localStorage.setItem("checkboxes", JSON.stringify(checkboxes)),
    [checkboxes]
  );

  // function for toggling the state of a specific checkbox
  const toggleCheck = (id: string) => {
    setCheckboxes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <checkboxContext.Provider value={{ checkboxes, toggleCheck }}>
      {children}
    </checkboxContext.Provider>
  );
}
