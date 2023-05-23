import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './views/homepage/HomePage';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';
import Register from './views/register/Register';
import ForgotPassword from './views/forgotpassword/ForgotPassword';
import Error from './views/404/404';
import AddProduct from './views/products/AddProduct';
import EditProduct from './views/products/EditProduct';
import Products from './views/products/Products';
import AddCategories from './views/categories/AddCategories';
import EditCategories from './views/categories/EditCategories';
import Categories from './views/categories/Categories';

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
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="/edit-product">
          <EditProduct />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/add-categories">
          <AddCategories />
        </Route>
        <Route path="/edit-categories">
          <EditCategories />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;