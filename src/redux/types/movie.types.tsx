export interface Movie {
  name: string,
  id: string,
  duration: number
}
export interface MoviesReducer {
  movies: Movie[],
  movieSelected: Movie
}

export const GET_MOVIE = 'GET_MOVIE'
export const GET_MOVIES = 'GET_MOVIES'

interface GetMovieAction {
  type: typeof GET_MOVIE,
  payload: string
}

interface GetMoviesAction {
  type: typeof GET_MOVIES
}

export type MovieActionTypes = GetMovieAction | GetMoviesAction