import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { loadProfiles } from './actions/profile';

// components
import Navbar from './components/layout/Navbar';
import Homepage from './components/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Admin from './components/admin/Admin';
import Library from './components/layout/Library';
import CategoryPage from './components/layout/CategoryPage';
import BookPage from './components/layout/BookPage';
import ProfilePage from './components/layout/ProfilePage';

import './app.scss';

// check for existing token
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(loadProfiles());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Homepage} />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/library" component={Library} />
          <Route exact path="/library/category/:id" component={CategoryPage} />
          <Route exact path="/library/book/:id" component={BookPage} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
