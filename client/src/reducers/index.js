import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';
import book from './book';

export default combineReducers({
    auth,
    category,
    book
});