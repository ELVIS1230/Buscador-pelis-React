
export function ListOfMovies ({movies}){

    return(
        <ul className='border-2 border-yellow-400 place-content-center gap-16 text-center' style={{display: "grid" , 'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))'}}>
          {
            movies.map(movie => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.image} alt={movie.title} />
              </li>

            ))
          }
        </ul>
    )
}

export function NoMoviesResults(){
    return(
        <p>No se encotraron resultados</p>
    )
}

export function Movies({movies}){
    const hasMovies = movies?.length > 0
    return (

            hasMovies 
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
        
    )
}