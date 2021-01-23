import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';

export default combineReducers({
    auth,
    category
});