import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './views/homepage/HomePage';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';
import Register from './views/register/Register';
import ForgotPassword from './views/forgotpassword/ForgotPassword';
import Error from './views/404/404';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/forget-password">
          <ForgotPassword />
        </Route>
        <Route path="/404">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;