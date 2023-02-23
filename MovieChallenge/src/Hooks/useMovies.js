import { useRef, useState, useMemo } from "react";
import { searchMovies } from "../services/petition";
export function useMovies({ search, sort }) {
  const [moviesearch, setMoviesSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previousSearch = useRef(search);

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === previousSearch.current) return;

      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const Newmovies = await searchMovies({ search });
        setMoviesSearch(Newmovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...moviesearch].sort((a, b) => a.title.localeCompare(b.title))
      : moviesearch;
  }, [sort, moviesearch]);

  return { moviesearch: sortedMovies, getMovies, loading };
}
