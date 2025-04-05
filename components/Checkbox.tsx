"use client";
// next
import { usePathname } from "next/navigation";

// context
import { useCheckbox } from "@/context/checkboxContext";

// react icons
import { FaCheck } from "react-icons/fa";

export default function Checkbox({ id }: { id: string }) {
  const { checkboxes, toggleCheck } = useCheckbox();

  const pathname = usePathname();

  return (
    <>
      <input
        className="appearance-none w-5 h-5 rounded-full border-2 border-main cursor-pointer"
        type="checkbox"
        checked={checkboxes[id] || false}
        onChange={() => toggleCheck(id)}
      />

      <div
        className={
          checkboxes[id]
            ? `flex items-center justify-center w-5 ${
                pathname === "/moving-guide" ? "h-5 sm:h-4" : "h-5"
              } absolute top-0 sm:top-1 left-0 bg-main rounded-full cursor-pointer`
            : "hidden"
        }
      >
        <div>
          <FaCheck size={10} fill="#fff" />
        </div>
      </div>
    </>
  );
}
