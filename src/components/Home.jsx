import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageCard from './ImageCard';
import '../styles/home.css';
import gif from '../assets/loading.gif';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const user = localStorage.getItem('user');
  const { movieList, isLoading } = useSelector((state) => state.movie);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [movieSearch, setMovieSearch] = useState('');
  const [draggedList, setDraggedList] = useState([]);

  useEffect(() => {
    if (user) {
      const storedValue = localStorage.getItem('draggedList');
      const initial = storedValue ? JSON.parse(storedValue) : movieList;
      setDraggedList(initial);
    }
  }, [user, movieList]);

  const dragItem = useRef(null);
  const dragItemOver = useRef(null);

  const dragStarted = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    dragItem.current = index;
  };

  const dragOver = (e, index) => {
    e.preventDefault();
    if (dragItem.current !== index) {
      dragItemOver.current = index;
    }
  };

  const dragEnd = () => {
    if (dragItem.current !== null && dragItemOver.current !== null) {
      const updatedList = [...draggedList];
      const [draggedItem] = updatedList.splice(dragItem.current, 1);
      updatedList.splice(dragItemOver.current, 0, draggedItem);
      setDraggedList(updatedList);
      localStorage.setItem('draggedList', JSON.stringify(updatedList));
    }
    dragItem.current = null;
    dragItemOver.current = null;
  };

  const searchMovie = (e) => {
    e.preventDefault();
    const filteredMovies = movieList.filter(
      (movie) =>
        movie.title.toLowerCase().includes(movieSearch.toLowerCase())
    );
    setDraggedList(filteredMovies);
    localStorage.setItem('draggedList', JSON.stringify(filteredMovies));
  };

  if (isLoading) {
    return (
      <div className="home-page">
        <img src={gif} alt="gif" />
      </div>
    );
  } else {
    return (
      <div className="home-page">
        <h2> Welcome to Tayo's Movie Gallery</h2>
        <p>You can drag a movie and drop it anywhere on the page</p>
        <form onSubmit={searchMovie}>
          <input
            type="text"
            placeholder="Search a movie"
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.target.value)}
            className ='form-input'
          />
          <button type="submit">Search</button>
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
  }
};

export default Home;
