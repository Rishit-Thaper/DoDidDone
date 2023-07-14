import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Profile from './pages/Profile';


//pages & components
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
        <div className='grid'>
            <div className='header'><Navbar/></div>
            <div className='pages'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
        <div className='footer'><Footer/></div>
        </div>
        </BrowserRouter>
    </div>

  )
}

export default App