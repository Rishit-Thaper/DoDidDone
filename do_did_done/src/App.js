import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


//pages & components
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
            <div className='header'><Navbar/></div>
            <div className='pages'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
        <div className='footer'><Footer/></div>
        </BrowserRouter>
    </div>

  )
}

export default App