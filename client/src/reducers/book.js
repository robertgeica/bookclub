import { DATA_LOAD, BOOK_LOAD, BOOK_LOAD_ERROR, ADD_BOOK, UPDATE_BOOK, DELETE_CATEGORY } from '../action/types';


const initialState = {
  data: null,
  currentBook: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DATA_LOAD:
    case ADD_BOOK:
    case DELETE_BOOK:
      return { data: payload };
    case UPDATE_BOOK:
      return { currentBook: payload};

    case BOOK_LOAD:
      return { ...state, currentBook: payload };
    
    case BOOK_LOAD_ERROR:
      return { ...state };

    default:
      return state;
  }
}