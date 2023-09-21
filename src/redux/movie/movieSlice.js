import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const credentials = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODMwOGRiNjA2MzY5MWUwODllMWM2YzI5MzNlZTUwNyIsInN1YiI6IjYzM2RkZGU1NGI2ZDlkMDA3OWNkMzQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKvtRqwcB8c3jO3hW1HGc_POQslmz-xDqF2FLIveD9U'
    }
  };
const url = 'https://api.themoviedb.org/3/movie/top_rated'
const base = 'https://api.themoviedb.org/3/movie/'
const api = '?api_key=08308db6063691e089e1c6c2933ee507'

const initialState = {
    movieList : [],
    details: [],
    isLoading: false,
    error: null,
    success: false,
}

export const fetchMovie = createAsyncThunk('movieList/get', async() => {
    try {
        const response = await axios.get(url, credentials);
        return response.data;
      }   catch (error) {
        if (AxiosError.isAxiosError(error) && !error.response) {
            throw new Error('Network error occurred. Please check your internet connection.');
          }
          return error;
        }
    });

    const movieSlice = createSlice({
        name: 'movie',
        initialState,
        reducers :{},
        extraReducers: (builder) =>{
            builder
            .addCase(fetchMovie.pending, (state) => ({
                ...state,
                isLoading: true,
                success: false,
            }))
            .addCase(fetchMovie.fulfilled, (state, action) => {
                const eachMovie = action.payload;
                const movieLibrary =  eachMovie.results || [];
                const movies = [];
                movieLibrary.map((movie)=> movies.push ({
                    id: movie.id,
                    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                    title: movie.title,
                }) );
                return {
                    ...state,
                    movieList : movies,
                    isLoading: false,
                    success: true,
                }
            })
            .addCase(fetchMovie.rejected, (state, action) => ({
                ...state,
                isLoading: false,
                error: action.payload,
              }))
        }
    })

    export default movieSlice.reducer;