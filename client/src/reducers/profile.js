import { 
  PROFILE_LOAD, PROFILES_LOAD, ADD_PROFILE, DELETE_PROFILE, PROFILE_LOAD_ERROR, UPDATE_PROFILE
 } from '../actions/types';
  
  const initialState = {
    profile: null,
    profiles: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case PROFILE_LOAD:
      case ADD_PROFILE:
      case DELETE_PROFILE:
      case UPDATE_PROFILE:
        return { ...state, profile: payload };

      case PROFILES_LOAD:
        return {profiles: payload };

      case PROFILE_LOAD_ERROR:
        return { ...state };
  
      default:
        return state;
    }
  }