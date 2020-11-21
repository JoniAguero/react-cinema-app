import { GET_MOVIE, GET_MOVIES, MovieActionTypes} from '../types/movie.types'

export function getMovie(id: string): MovieActionTypes {
  return {
    type: GET_MOVIE,
    payload: id
  }
}

export function getMovies(): MovieActionTypes {
  return {
    type: GET_MOVIES
  }
}