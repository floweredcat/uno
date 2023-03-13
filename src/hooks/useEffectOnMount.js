import { useEffect, useRef } from "react";

export function useEffectOnMount(callback) {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      callback();
    }
  }, []);
}
