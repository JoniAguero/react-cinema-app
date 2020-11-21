import { SET_ERROR } from '../types/moviesTypes';

const initialState = '';

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
