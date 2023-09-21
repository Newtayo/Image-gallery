import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import {auth} from '../firebase';
import '../styles/login.css'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState(false);
    const [success, setSuccess] = useState(false);


    const signUp =(e) =>{
        e.preventDefault();
        if(password === passwordConfirmation){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setMessage(false);
                setSuccess(true)
            }).catch((error)=>{
                console.log(error);
                setMessage(true);
                setSuccess(false)
            })
        }
        else{
            setMessage(true);
            setSuccess(false);
        }
      
    }

  return (
    <div  className='login-container'>
          <h2>Sign up Form</h2>
        <form onSubmit={signUp}  className='login-form'>
            {success? <p>Sign up Success</p>: <p></p>}
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
             <input type='password'
             placeholder='Confirm your password'
             value={passwordConfirmation}
             onChange={(e)=> setPasswordConfirmation(e.target.value)}
             className='form-input'
             required
             />
             <hr className="divider" />
             <button type='submit' className="Submit"> Sign Up</button>
             <NavLink to ='/' className="signup"> Already a Member? Sign in </NavLink>
             {
              message ? <p>Password does not match</p> : <p></p>  
             }
        </form>
    </div>
  )
}

export default SignUp