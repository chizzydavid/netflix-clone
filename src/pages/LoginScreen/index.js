import React, { useState, useEffect, useRef } from 'react'
import './LoginScreen.css'
import { auth } from '../../firebase';

function LoginScreen({ email, isSignIn }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isLogin, setIsLogin] = useState(false);
    const [formError, setFormError] = useState('');
    
    useEffect(() => {
        emailRef.current.value = email;
        setIsLogin(isSignIn);
    }, [email, isSignIn]);

    const register = (e) => {
        setFormError('');
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => { console.log(authUser); })
        .catch((error) => { setFormError(error.message); });       
    }

    const signIn = (e) => {
        setFormError('');
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => { console.log(authUser); })
         .catch((error) => { setFormError(error.message); });       
    }

    const handleChange = (e) => {
        setFormError('');
    }

    
    return (
        <div className="signupScreen">
            <form>
                <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
                <p className="form_error">{formError && formError}</p>
                <input onChange={handleChange} ref={emailRef} placeholder="Email" type="email" />
                <input onChange={handleChange} ref={passwordRef} placeholder="Password" type="password" />

                {isLogin
                  ? <button onClick={signIn} type="submit"> Sign In</button>
                  : <button onClick={register} type="submit"> Sign Up</button>
                }
            </form>

                {isLogin
                ?
                    <h4>
                        <span className="signupScreen__gray"> New to Netflix? </span> 
                        <span className="signupScreen__link" onClick={() => {setIsLogin(false)}}> Sign Up now. </span> 
                    </h4>
                :
                    <h4>
                        <span className="signupScreen__gray"> Already have an account? </span> 
                        <span className="signupScreen__link" onClick={() => {setIsLogin(true)}}> Sign In </span> 
                    </h4>
                
                }

        </div>
    )
}

export default LoginScreen
