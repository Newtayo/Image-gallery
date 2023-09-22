import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { useDispatch } from 'react-redux'
import { fetchMovie } from './redux/movie/movieSlice'
import Sidebar from './components/Sidebar'

  function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(fetchMovie())
    }, [dispatch])

  return (
    <div>
       <Router>
      <Sidebar />
     
        <Routes>
        <Route path="/" element={<Login/>} exact />
        <Route path="/signup" element={<SignUp/>}  />
        <Route path="/home" element={<Home />}  />
        </Routes>
      </Router>
    </div>
  )
}

export default App
