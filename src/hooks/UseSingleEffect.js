import { useEffect, useRef } from "react";

export function useSingleEffect(callback, dependeches = []) {
  const dependeciesMapRef = useRef(null);
  useEffect(() => {
    if (
      !dependeciesMapRef.current ||
      dependeciesMapRef.current?.some((el, idx) => dependeches[idx] !== el)
    ) {
      dependeciesMapRef.current = dependeches;
      callback();
    }
  }, dependeches);
}
