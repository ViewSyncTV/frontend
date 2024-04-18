import { useState } from "react";

function usePersistantState(
  key,
  initialValue
){
  const [state, setInternalState] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setState = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };
  return [state, setState];
}

export default usePersistantState;
