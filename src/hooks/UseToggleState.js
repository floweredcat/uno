import { useState } from "react";

export function useToggleState(initialState) {
  const [state, setState] = useState(initialState);

  const toggleFunction = () => {
    setState(!state);
  };

  return [state, toggleFunction];
}
