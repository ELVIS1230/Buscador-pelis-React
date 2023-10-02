// import { useEffect, useState } from 'react'
import { useCallback, useState } from 'react'
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
// import whithoutResults from './mocks/without-results.json'



function App() {
  const [sort , setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies ,loading, getMovies} = useMovies( {search , sort})
  
 
  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    },350)
    ,[getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }


  const handleSort = () =>{
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }


  return (
    <div className='border-2 border-red-400 flex flex-col items-center '>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="flex " onSubmit={handleSubmit} >
          <input onChange={handleChange} name="search" value={search} type="text" placeholder='Avengers, Star Wars, The Matrix' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type="submit" className='border-2 '>Buscar</button>
        
        </form>
        {error && <p className='text-red-400 font-semibold'>{error}</p>}
      </header>
      <main className='border-2 border-blue-500 w-11/12'>
      {
        loading ? <p>Cargando....</p> : <Movies movies={movies} /> 
      }
        
      </main>
    </div>
  )
}

export default App
