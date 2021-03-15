import React, { useState, useEffect } from 'react'
import './Nav.css'
import { useHistory } from "react-router-dom";
import netflixLogo from '../../assets/images/netflix_logo.png';
import { useDispatch } from 'react-redux';
import { setQuery } from '../../features/movieSlice';

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const transitionNavBar = () => {
        if (window.scrollY > 100) handleShow(true);
        else handleShow(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);


    const handleOnChange = (val) => {
        dispatch(setQuery(val.target.value));
    }

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img
                    onClick={() => history.push('/')}
                    className="nav__logo"
                    src={netflixLogo}
                    alt="netflix logo"
                />


            <div className="search_bar">
                <input onChange={handleOnChange} name="search" placeholder="Search" type="text" />
            </div>
                <img
                    onClick={() => history.push('/profile')}
                    className="nav__avatar"
                    src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                    alt="user"
                />

            </div>

        </div>
    )
}

export default Nav

