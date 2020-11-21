import {
  MovieActionTypes,
  GET_MOVIES,
  MoviesReducer
} from '../types/movie.types'

const initialState: MoviesReducer = {
  movies: [],
  movieSelected: {
    name: '',
    id: '',
    duration: 0
  }
}

export function moviesReducer(
  state = initialState,
  action: MovieActionTypes
): MoviesReducer {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: [...state.movies]
      }
    default:
      return state
  }
}