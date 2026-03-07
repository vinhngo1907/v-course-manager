"use client";

import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  children: ReactNode;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
}

export const ConfirmModal = ({
  children,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{description}</p>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isLoading ? "Deleting..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};