import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';
import book from './book';
import profile from './profile';

export default combineReducers({
    auth,
    category,
    book,
    profile
});