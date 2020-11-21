import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE } from '../types/moviesTypes';
import { MOVIE_API_URL } from '../../services/movies.service';

export const getMovies = (type: any, pageNumber: any) => async (dispatch: any) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const loadMoreMovies = (type: any, pageNumber: any) => async (dispatch: any) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPages: payload.totalPages }, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const setResponsePageNumber = (page: any, totalPages: any) => async (dispatch: any) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type: any) => async (dispatch: any) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

const dispatchMethod = (type: any, payload: any, dispatch: any) => {
  dispatch({ type, payload });
};

const getMoviesRequest = async (type: any, pageNumber: any) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};