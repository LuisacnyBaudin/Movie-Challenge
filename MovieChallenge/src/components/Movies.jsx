function Rendermovies({ moviesearch }) {
  return (
    <ul className="moviesearch">
      {moviesearch.map((movie) => {
        return (
          <li className="mapmovies" key={movie.id}>
            <h2>{movie.title}</h2>
            <h2>{movie.year}</h2>
            <img src={movie.poster} alt={movie.title} />
          </li>
        );
      })}
    </ul>
  );
}

function Noresults() {
  return <p> No se encuentran resultados</p>;
}

export function Movies({ moviesearch }) {
  const hasMovies = moviesearch?.length > 0;

  return hasMovies ? <Rendermovies moviesearch={moviesearch} /> : <Noresults />;
}
