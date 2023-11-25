import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

import "./App.css";
import { fetchMovies } from "./api/fetchMovie";
import { Movie as TMovie } from "./types/movie";
import Movie from "./Movie";
import ObserverTarget from "./ObserverTarget";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

const MAX_PAGE = 3;

function App() {
  const { data, isLoading, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        return lastPageParam + 1 > MAX_PAGE ? null : lastPageParam + 1;
      },
    });
  const targetElement = useRef<HTMLDivElement>(null);
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fetchNextPage();
      });
    },
    [fetchNextPage]
  );

  useIntersectionObserver(
    {
      callback: observerCallback,
      option: {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      },
      targetElement,
    },
    [isLoading]
  );

  if (status === "error") return <>{`fail to fetch data ${error.message}`}</>;
  if (status === "pending") return <>Loading...</>;

  // status === "success"일 때로 data가 있음을 보장.
  const movies = data?.pages.map((pageMovieData: TMovie[]) =>
    pageMovieData.map((movieContent: TMovie) => (
      <Movie key={movieContent.id} movie={movieContent} />
    ))
  );

  return (
    <div className="margin-auto">
      <h1>infinite scroll with react-query</h1>
      <div className="container">{movies}</div>
      <ObserverTarget
        targetRef={targetElement}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default App;
