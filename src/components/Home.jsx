import React, { useRef, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import ImageCard from './ImageCard';
import '../styles/home.css';
import gif from '../assets/loading.gif'

const Home = () => {
  const { movieList, isLoading, error } = useSelector((state) => state.movie);

  // Use the custom hook to manage draggedList
  const [draggedList, setDraggedList] = useLocalStorage('draggedList', movieList);
  const [movieSearch, setMovieSearch] = useState("")


  const dragItem = useRef(null);
  const dragItemOver = useRef(null);

  const dragStarted = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    dragItem.current = index;
  };

  const dragOver = (e, index) => {
    e.preventDefault();
    if (dragItem.current !== index) {
      dragItemOver.current = index;
    }
  };

  const dragEnd = () => {
    // Rearrange the list based on drag-and-drop
    if (dragItem.current !== null && dragItemOver.current !== null) {
      const updatedList = [...draggedList];
      const [draggedItem] = updatedList.splice(dragItem.current, 1);
      updatedList.splice(dragItemOver.current, 0, draggedItem);
      setDraggedList(updatedList);
    }

    dragItem.current = null;
    dragItemOver.current = null;
  };
  const searchMovie =(e)=>{
    e.preventDefault();
    const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(movieSearch.toLowerCase()))
    setDraggedList(filteredMovies)
  }
  if(isLoading){
    return(
        <div className='home-page'>
        <img src={gif} alt='gif'/>
        </div>
    )
  }
  else{
  return (
    <div className='home-page'>
        <h2> Welcome to Tayo's Movie Gallery</h2>
        <p>You can drag a movie and drop in at any point in the page</p>
        <form onSubmit={searchMovie}>
            <input type='text' placeholder='Search a movie'
             value={movieSearch} 
             onChange={(e)=>setMovieSearch(e.target.value)}
             />
            <button type='submit'>Search</button>
        </form>

      <div className="movie-list">
        {draggedList.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => dragStarted(e, index)}
            onDragOver={(e) => dragOver(e, index)}
            onDragEnd={() => dragEnd()}
            className="card"
          >
            <ImageCard image={item} />
          </div>
        ))}
      </div>
    </div>
  );
}};

// Custom hook for syncing state with local storage
function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default Home;
