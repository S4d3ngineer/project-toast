import { createContext, useCallback, useMemo, useState } from "react";
import ToastShelf from "./ToastShelf";
import { useKeyDown } from "../hooks/useKeyDown";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const createToast = useCallback(
    (message, variant) => {
      setToasts([
        ...toasts,
        {
          id: new Date().getTime() + Math.random(),
          children: message,
          variant,
        },
      ]);
    },
    [toasts]
  );

  const dismissToast = useCallback((id) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  const dismissAllToasts = useCallback(() => {
    setToasts(() => []);
  }, []);

  useKeyDown("Escape", dismissAllToasts);

  const contextValue = useMemo(
    () => ({
      toasts,
      createToast,
      dismissToast,
      dismissAllToasts,
    }),
    [toasts, createToast, dismissToast, dismissAllToasts]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastShelf />

      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
