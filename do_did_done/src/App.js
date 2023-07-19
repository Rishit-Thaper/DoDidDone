import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuthContext } from './hooks/useAuthContext';

//pages & components
function App() {
  const {user} = useAuthContext();
  return (
    <div className='App'>
        <BrowserRouter>
            <div className='header'><Navbar/></div>
            <div className='pages'>
                <Routes>
                    <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/> }/>
                    <Route path="/signup" element={!user ? <SignUp/> : <Navigate to="/"/>}/>
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