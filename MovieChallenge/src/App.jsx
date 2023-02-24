import "./App.css";
import debounce from "just-debounce-it";
import { useMovies } from "./Hooks/useMovies";
import { Movies } from "./components/Movies";
import { useEffect, useRef, useState, useCallback } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Este campo es requerido");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede mostrar una pelicula con un número");
      return;
    }
    if (search.length < 3) {
      setError("Ingresa mas datos, para poder mostrar una pelicula");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { moviesearch, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );
  const handledSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handledChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setSearch(event.target.value);
    setSearch(newQuery);
    debouncedGetMovies(newQuery);
  };

  return (
    <div className="containerPage">
      <header>
        <label>¿Deseas buscar alguna pelicula?</label>
        <form className="form" onSubmit={handledSubmit}>
          <input
            onChange={handledChange}
            value={search}
            name="search"
            placeholder="Ingresa el nombre"
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </header>

      <main>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Movies moviesearch={moviesearch} sort={sort} />
        )}
      </main>
    </div>
  );
}

export default App;
