import { useRef, useEffect } from "react";

export const usePrev = arg => {
  const ref = useRef();

  useEffect(() => {
    ref.current = arg;
    console.log(ref);

  }, [arg])
  return ref;
}
