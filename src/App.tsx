import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

import "./App.css";
import { fetchMovies } from "./api/fetchMovie";
import { Movie as TMovie } from "./types/movie";
import Movie from "./Movie";

const MAX_PAGE = 3;

function App() {
  const { data, status, error, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1 > MAX_PAGE ? null : lastPageParam + 1;
    },
  });
  const targetElement = useRef<HTMLDivElement>(null);
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("target과 intersection 됨.");
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    console.log("in useEffect current", targetElement.current);
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    if (targetElement.current) observer.observe(targetElement.current);

    return () => {
      targetElement.current && observer.unobserve(targetElement.current);
    };
  }, [observerCallback]);

  console.log("app component rendered!!!");
  console.log("ref", targetElement.current);
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
      <div
        style={{ height: "200px", backgroundColor: "red", fontSize: "3rem" }}
        ref={targetElement}
      >
        {isFetching
          ? "loading next page"
          : "intersection with this area so fetch next page will be invoke!"}
      </div>
    </div>
  );
}

export default App;
