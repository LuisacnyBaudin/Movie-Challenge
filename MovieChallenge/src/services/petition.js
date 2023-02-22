const API_KEY= "3f7791f1"



export const searchMovies= async ({search}) => {
    if(search === "") return null 

    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=3f7791f1&s=${search}`)
        const json = await response.json()
        
        const moviesearch = json.Search

        return moviesearch?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          }));
    } catch(e){
        throw new Error("Error buscando la pelicula")

    }

      }

    