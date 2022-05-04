import { useMemo } from "react";

export const useDebounce = (passedCallback: (arg: any) => void) => {
  const debounce = (callback: any) => {
    let timeout: any;
    return (e: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(e);
      }, 500);
    };
  };

  const debouncedFn = useMemo(() => debounce(passedCallback), []);

  return debouncedFn;
};
