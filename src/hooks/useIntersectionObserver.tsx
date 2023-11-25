import { DependencyList, RefObject, useEffect } from "react";

interface Props {
  callback: (entries: IntersectionObserverEntry[]) => void;
  targetElement: RefObject<HTMLElement>;
  option: IntersectionObserverInit;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseIntersectionObserver = (
  props: Props,
  dependencies?: DependencyList
) => void;

const useIntersectionObserver: UseIntersectionObserver = (
  { callback, targetElement, option },
  dependencies = []
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    if (targetElement.current) observer.observe(targetElement.current);
    const copyElement = targetElement;

    return () => {
      copyElement.current && observer.unobserve(copyElement.current);
    };
  }, [targetElement, option, callback, ...dependencies]);
};

export default useIntersectionObserver;
