import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "./api/fetchMovie";

import "./App.css";
import { Movie as TMovie } from "./types/movie";
import Movie from "./Movie";

function App() {
  const { data, status, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: () => 2,
  });

  if (status === "error") return <>{`fail to fetch data ${error.message}`}</>;
  if (status === "pending") return <>Loading...</>;

  // status === "success"일 때로 data가 있음을 보장.
  const movies = data?.pages.map((pageMovieData: TMovie[]) =>
    pageMovieData.map((movieContent: TMovie) => (
      <Movie key={movieContent.id} movie={movieContent} />
    ))
  );

  return (
    <>
      <h1>infinite scroll with react-query</h1>
      <div className="container">{movies}</div>
    </>
  );
}

export default App;
