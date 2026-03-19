import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import React from "react";

type DropdownProps = {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>; 
  children: React.ReactNode;
  onClose: () => void;
};

export default function PortalDropdown({
  isOpen,
  anchorRef,
  children,
  onClose,
}: DropdownProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // вычисляем позицию меню относительно кнопки
  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorRef, isOpen]);

  // Закрытие при клике вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // если клик вне кнопки и вне меню
      if (
        anchorRef.current &&
        !anchorRef.current.contains(target) &&
        !(
          event.target instanceof HTMLElement &&
          event.target.closest(".portal-dropdown")
        )
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, anchorRef, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="absolute portal-dropdown bg-white  bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[120px]"
      style={{ top: position.top, left: position.left }}
    >
      {children}
      <button
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
    </div>,
    document.body,
  );
}
