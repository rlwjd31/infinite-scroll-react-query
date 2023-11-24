const fetchMovies = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseLang = "ko";
  const url = `https://api.themoviedb.org/3/movie/popular?language=${baseLang}&page=1&api_key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `fail to fetch movie data, statusCode: ${response.status}`
      );
    }
    const { results } = await response.json();

    return results;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export { fetchMovies };
