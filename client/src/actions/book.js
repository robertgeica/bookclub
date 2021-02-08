import axios from 'axios';
import { DATA_LOAD, BOOK_LOAD, BOOK_LOAD_ERROR, ADD_BOOK, UPDATE_BOOK } from './types';


export const loadData = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/books");

    dispatch({
      type: DATA_LOAD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LOAD_ERROR,
    });
  }
};

export const loadBook = (id) => async (dispatch) => {
  try {
    const res = await axios.get("/api/books/" + id);

    
    dispatch({
      type: BOOK_LOAD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LOAD_ERROR,
    });
  }
};

export const handleAddBook = (newBook) => async (dispatch) => {
  try {
    const res = await axios.get("/api/books");

    const bookObj = {
      title: newBook.title,
      author: newBook.author,
      rating: newBook.rating,
      category: newBook.category,
      subcategories: newBook.subcategories,
      description: newBook.description,
      imageUrl: newBook.imageUrl,
      language: newBook.language,
      pages: newBook.pages,
      format: newBook.format,
      fileName: newBook.fileName,
      isbn: newBook.isbn,
    };

    await axios.post("/api/books", bookObj);
    const newData = [...res.data, bookObj];

    dispatch({
      type: ADD_BOOK,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LOAD_ERROR,
    });
  }
};

export const handleUpdateRating = (id, newRating) => async (dispatch) => {
  try {
    const res = await axios.get("/api/books/" + id);

    const bookObj = {
      ...res.data,
      rating: newRating,
    };
    console.log(bookObj);

    await axios.put("/api/books/" + id, bookObj);

    dispatch({
      type: UPDATE_BOOK,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LOAD_ERROR,
    });
  }
};