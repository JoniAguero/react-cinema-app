import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE, SEARCH_QUERY, SEARCH_RESULT, MOVIE_DETAILS, CLEAR_MOVIE_DETAILS } from '../types/moviesTypes';
import { MOVIE_API_URL, SEARCH_API_URL, MOVIE_DETAILS_URL, MOVIE_CREDITS_URL, MOVIE_IMAGES_URL, MOVIE_VIDEOS_URL, MOVIE_REVIEWS_URL } from '../../services/movies.service';

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

export const searchResult = (query: any) => async (dispatch: any) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const movieDetails = (id: any) => async (dispatch: any) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(MOVIE_DETAILS, resp, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch: any) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page: any, totalPages: any) => async (dispatch: any) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type: any) => async (dispatch: any) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

export const searchQuery = (query: any) => async (dispatch: any) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
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