import React from 'react';
import './App.css';
import Footer from './Components/footer/Footer';
import Header from './Components/header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import authentication from './service/auth';
import { useState } from 'react';
import Landing from './Components/landing/Landing';
import Search from './Components/search/Search';
import Favourite from './Components/favourite/Favourite';
import NotFound from './Components/NotFond/NotFound';

export default function App() {

  // Usestate to check if the User is Logged In
  const [isLoggedIn, setIsLoggedIn] = useState(authentication.isLoggedInfun());

  // Function for changing the useState "isLoggedIn"
  function loginHandlerFunction(status) {
    setIsLoggedIn(status);
  }
  
  return (
    <div className='main-content' >
      <Router>
        <Header loginStatus={isLoggedIn} loginHandler={loginHandlerFunction} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/favourite" component={() => isLoggedIn ? <Favourite /> : <Redirect to="/login" />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={() => <Login loginHandler={loginHandlerFunction} />} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>

    </div >
  )
}