import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LandingScreen from './pages/LandingScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './pages/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let userObj = localStorage.getItem('userObj');
    if (userObj) {
      dispatch(login(JSON.parse(userObj)));
      return {};
    }
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        const userObj = {
          uid: userAuth.uid,
          email: userAuth.email,
        };
        dispatch(login(userObj));

      } else {
        dispatch(logout());
      }
    })

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      
      <Router>
        {
          !user 
            ? ( <LandingScreen /> )
            : (
                <Switch>
                  <Route exact path="/">
                    <HomeScreen />
                  </Route>                    
                  
                  <Route path="/profile">
                    <ProfileScreen />
                  </Route>  
                </Switch>
              )
        }
      </Router>
      
    </div>
  );
}

export default App;


