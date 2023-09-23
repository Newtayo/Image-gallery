import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {auth} from '../firebase';
import '../styles/login.css'
import logo from '../assets/banner.jpg'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
          navigate('/home');
        }
      }, [user, navigate]);

    const signIn =(e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log(userCredential)
            localStorage.setItem('user', userCredential.user.uid);
            navigate('/home')
            setMessage(false)
        }).catch((error) =>{
            setMessage(true)
            console.log(error)
        })
    }

      return (
    <div className='login-container'>
        <h2>Movie Gallery</h2>
        <h2>Login Form</h2>
        <form onSubmit={signIn} className='login-form'>
            <input type='email'
             placeholder='Please Enter your Email'
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             className='form-input'
             required
             />
              <hr className="divider" />
             <input type='password'
             placeholder='Please type your password'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             className='form-input'
             required
             />
              <hr className="divider" />
             <button type='submit' className="Submit"> Login</button>
             <NavLink to="/signup" className="signup"> Not a Member? Sign up </NavLink>{
              message ? <p>Incorrect Login Details</p> : <p></p>  
             }
        </form>
    </div>
  )
}

export default Login