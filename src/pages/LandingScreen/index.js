import React, { useState, useRef } from 'react'
import "./LandingScreen.css"
import LoginScreen from '../LoginScreen';
import netflixLogo from '../../assets/images/netflix_logo.png';


function LandingScreen() {
    const [auth, setAuth] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const emailRef = useRef(null);

    const handleAuthClick = (isLogin) => {
        if (auth) return;
        setAuth(true);
        setIsSignIn(isLogin);
    }

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img
                    className="nav__logo"
                    src={netflixLogo}
                    alt="netflix logo"
                />                     

                <button className="loginScreen__button" onClick={() => handleAuthClick(true)} >
                    Sign In
                </button>

                <div className="loginScreen__gradient" />
            </div>

            <div className="loginScreen__body" >
                {auth 
                    ? ( <LoginScreen email={emailRef.current.value} isSignIn={isSignIn} /> )
                    : (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="loginScreen__input">
                                <form className="form">
                                    <input ref={emailRef} className="get_started" type="email" placeholder="Email Address"  />
                                    <button 
                                        onClick={() => handleAuthClick(false)}
                                        className="loginScreen__getStarted"> 
                                        GET STARTED 
                                    </button>
                                </form>
                            </div>
                        </>

                    )
                }

            </div>
        </div>
    )
}

export default LandingScreen
