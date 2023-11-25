import { RefObject } from "react";

interface Props<T extends HTMLDivElement> {
  targetRef: RefObject<T>;
  isFetchingNextPage: boolean;
}

const ObserverTarget = <T extends HTMLDivElement>({
  targetRef,
  isFetchingNextPage,
}: Props<T>): JSX.Element => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "1rem", fontSize: "2rem" }}
      ref={targetRef}
    >
      {isFetchingNextPage && "loading next page"}
    </div>
  );
};

export default ObserverTarget;
