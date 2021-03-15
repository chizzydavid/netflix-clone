import React from 'react'
import './ProfileScreen.css'
import Nav from '../../components/Nav'
import { selectUser, logout } from '../../features/userSlice'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';


    
function ProfileScreen() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    return (
        <div className="profileScreen">
            <Nav />

            <div className="profileScreen__body">
                <h1>Your Profile</h1>

                <div className="profileScreen__info">
                    <img
                        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                        alt="user"
                    />

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>

                        <div className="profileScreen__plans">
                            <h3>Plans</h3>

                            <div className="profileScreen__plan">
                                <div className="plan__info">
                                    <h3>Netflix Standard</h3>
                                    <p>1080p</p>
                                </div>
                                <button>Subscribe</button>
                            </div>

                            <div className="profileScreen__plan">
                                <div className="plan__info">
                                    <h3>Netflix Basic</h3>
                                    <p>480p</p>
                                </div>
                                <button>Subscribe</button>
                            </div>

                            <div className="profileScreen__plan">
                                <div className="plan__info">
                                    <h3>Netflix Premium</h3>
                                    <p>4k+HDR</p>
                                </div>
                                <button className="current">Current Plan</button>
                            </div>                            

                            <button
                                className="profileScreen__signOut"
                                onClick={() => {
                                    window.location.pathname = '';
                                    auth.signOut();
                                    dispatch(logout())
                                }}
                            >Sign Out</button>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
