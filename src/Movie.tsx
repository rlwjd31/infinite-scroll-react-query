import { FC } from "react";

import "./movie.css";
import { Movie as TMovie } from "./types/movie";

interface Props {
  movie: TMovie;
}

const Movie: FC<Props> = ({ movie }): JSX.Element => {
  const { backdrop_path, overview, title, vote_average, vote_count } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;

  return (
    <div className="movie-card">
      <h1>{title}</h1>
      <img src={imageUrl} alt="movie image" />
      <div className="movie-content">
        <p>{overview}</p>
        <div className="movie-vote">
          <span>{vote_average}</span>
          <span>{vote_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
