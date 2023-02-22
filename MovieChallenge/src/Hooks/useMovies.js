
import { useState } from "react";
import { searchMovies } from "../services/petition";
export function useMovies({ search }) {

  const [moviesearch, setMoviesSearch] = useState([]);

 
  const getMovies = async () => {
   const Newmovies= await searchMovies({search})
   setMoviesSearch(Newmovies)
  };

  return { moviesearch, getMovies };
}
