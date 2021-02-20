import axios from 'axios';
import { PROFILE_LOAD, PROFILES_LOAD, ADD_PROFILE, DELETE_PROFILE, UPDATE_PROFILE, PROFILE_LOAD_ERROR } from './types';

export const loadProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile');

		// console.log(res.data);

		dispatch({
			type: PROFILES_LOAD,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
	}
};

export const loadProfile = (id) => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/' + id);

		console.log(res.data);
		dispatch({
			type: PROFILE_LOAD,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
	}
};

export const handleAddProfile = (id) =>  async dispatch => {
	try {
		
		const profileObj = {
			username: '',
			profileImage: '',
			wishlist: [],
			readingList: [],
			readedBooks: [],
			points: 0,
			userId: id
			// username, profileImage, wishlist, readingList, readedBooks, points
		};
		console.log(profileObj);
		
		await axios.post('/api/profile/', profileObj);

		dispatch({
			type: ADD_PROFILE,
			payload: [profileObj]
		});
		
	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
		
	}
}
export const handleUpdateProfile = (id, newProfile) => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/' + id);

		console.log(res.data);
		const profileObj = {
			// username, profileImage, wishlist, readingList, readedBooks, points
		};
		console.log(profileObj);

		await axios.put('/api/profile/' + id, profileObj);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
	}
};

export const handleAddToWishlist = (bookId, userId) => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/' + userId);

		let alreadyWishlisted = false;
    res.data[0].wishlist.map(bk => {
      if(bk === bookId) {
        alreadyWishlisted = true;
      } 
    });
		
    if(alreadyWishlisted) {
			let newWishlist = res.data[0].wishlist.filter(bkId => bkId != bookId);

			const profileObj = {
				...res.data[0],
				wishlist: newWishlist
			}
			await axios.put('/api/profile/' + userId, profileObj);
      console.log(profileObj);
      console.log('alert: already wishlisted. deleted');
    } else {
      const profileObj = {
        ...res.data[0],
        wishlist: [ ...res.data[0].wishlist, bookId ]
      };

      await axios.put('/api/profile/' + userId, profileObj);
      console.log(profileObj);
			console.log('adding to wishlist')
		}

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(loadProfile(userId));
	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
	}
};

export const handleAddToReadList = (bookId, userId) => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/' + userId);

  
		let bookExists = false;

    res.data[0].readedBooks.map(bk => {
      if(bk === bookId) {
        bookExists = true;
      } 
    });
		
    if(bookExists) {
			let newReadBooks = res.data[0].readedBooks.filter(bkId => bkId != bookId);

			const profileObj = {
				...res.data[0],
				readedBooks: newReadBooks
			}
			await axios.put('/api/profile/' + userId, profileObj);
      console.log(profileObj);
      console.log('alert: already on completed list. deleted');
    } else {
      const profileObj = {
        ...res.data[0],
        readedBooks: [ ...res.data[0].readedBooks, bookId ]
      };

      await axios.put('/api/profile/' + userId, profileObj);
      console.log(profileObj);
			console.log('adding to completed list')
		}

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(loadProfile(userId));

	} catch (error) {
		dispatch({
			type: PROFILE_LOAD_ERROR
		});
	}
};
