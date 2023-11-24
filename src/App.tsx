import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { fetchMovies } from "./api/fetchMovie";

function App() {
  const { data, error, status } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (status === "error") return <>{`fail to fetch data ${error.message}`}</>;
  if (status === "pending") return <>Loading...</>;

  console.log("data", data);
  return (
    <>
      <h1>infinite scroll with react-query</h1>
      <div className="container">
        <div style={{ backgroundColor: "red" }} className="movie-card">
          div1
        </div>
        <div style={{ backgroundColor: "blue" }} className="movie-card">
          div1
        </div>
        <div style={{ backgroundColor: "green" }} className="movie-card">
          div1
        </div>
      </div>
    </>
  );
}

export default App;
