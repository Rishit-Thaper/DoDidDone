import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/navbar.css'

export default function () {
  return (
    <div className="navbar">
        
        <div className="logo">
            <h1>DoDidDone</h1>
        </div>
        
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/profile">User</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </nav>        
    
    </div>

  )
}
  