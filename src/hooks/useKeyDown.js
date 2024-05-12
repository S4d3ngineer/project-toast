import { useEffect } from "react";

export function useKeyDown(key, callback) {
  useEffect(() => {
    const eventHandler = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", eventHandler);

    return () => {
      window.removeEventListener("keydown", eventHandler);
    };
  }, [callback, key]);
}
