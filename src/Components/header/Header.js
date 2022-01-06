import './Header.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import authentication from"../../service/auth";

const Header = (props) => {
    // History Object 
    let history = useHistory();
    
    // Logout Function
    async function logout() {
        // Checking Autheticated user is logging out or not
        await fetch('http://localhost:9000/auth/isAuthenticated', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then((
                // Removing token, email and name
                localStorage.removeItem('token'),
                localStorage.removeItem('email'),
                localStorage.removeItem('name'),
                authentication.isLoggedIn = false,
                props.loginHandler(false),
                history.push('/login')
            ));

    }



    return (
        // Navigation Bar
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" data-testid="navBar">
            <span className="navbar-brand">
                <img src="/images/weather.png" alt="" />
            </span>
            <span className="navbar-brand" id="headbrand">Cloudy</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {/* Landing Page Link */}
                    <li className="nav-item" data-cy="header-link-home">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    {/* Search Page Link */}
                    <li className="nav-item" data-cy="header-link-Search">
                        <Link to="/search" data-cy="search-link" className="nav-link">Search</Link>
                    </li>
                    {/* Favourite Page Link */}
                    <li className="nav-item" data-cy="header-link-Favourites">
                        <Link to="/favourite" className="nav-link">Favourites</Link>
                    </li>
                </ul>

                {
                    // Based on login status we will decide which buttons to diplay in the right corner
                    props.loginStatus ?
                    // If user has logged in then diplay Name of the user and dropdown for logout
                    <div className="dropdown mx-4">
                    <button data-cy="header-username" className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="text-white text-uppercase fw-bold ml-5 fs-6">{localStorage.getItem('name')}</span>
                    </button>
                        <ul className="dropdown-menu">
                            {/* Logout Link */}
                            <li data-cy="header-link-Logout" className="dropdown-item text-center" onClick={logout} >Logout</li>
                        </ul>
                    </div> 
                    :  
                    // If user is not logged in
                    <ul className="navbar-nav">
                        {/* Register Link */}
                        <li className="nav-item" data-cy="header-link-Register">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        {/* Login Link */}
                        <li className="nav-item" data-cy="header-link-Login">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li> 
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Header;