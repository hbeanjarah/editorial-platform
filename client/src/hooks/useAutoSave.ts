import { useEffect, useRef } from "react";

const AUTO_SAVE_INTERVAL = 30000; // 30 secondes as the requirement specifies

export function useAutoSave(
  callback: () => void,
  data: unknown,
  delay: number = AUTO_SAVE_INTERVAL,
) {
  const dataRef = useRef(data);
  const lastSavedRef = useRef<string>(JSON.stringify(data));
  const callbackRef = useRef(callback);

  useEffect(() => {
    dataRef.current = data;
    callbackRef.current = callback;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const current = JSON.stringify(dataRef.current);
      if (current !== lastSavedRef.current) {
        lastSavedRef.current = current;
        callbackRef.current();
      }
    }, delay);

    return () => clearInterval(timer);
  }, [delay]);
}
