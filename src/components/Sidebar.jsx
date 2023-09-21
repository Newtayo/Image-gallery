import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/sidebar.css'
import logo from '../assets/banner.jpg'

const Sidebar = () => {
const user =    localStorage.getItem('user');
const navigate = useNavigate()
const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signout was successful");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

if (user){
    return (
        <div className="nav">
          <img src={logo} className="img" alt='logo' />
          <button type="button" onClick={userSignOut} className='logout'>Logout</button>
        </div>
      );  

}
else{
    return (
        <div className="nav">
          <img src={logo} className="img" alt='logo' />
          <ul className="link">
          
          </ul>
          
        </div>
      );  

}

};

export default Sidebar;
