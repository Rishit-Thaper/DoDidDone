import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/navbar.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function () {
  
  const {user} = useAuthContext();
  const {logout} = useLogout()

  const handleClick = ()=>{
    logout();
  }
  return (
    <div className="navbar">
        
        <div className="logo">
            <h1>DoDidDone</h1>
        </div>
        
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {user && (
              <>
                <Link to="/profile">{user.email}</Link>        
                <Link onClick={handleClick}>Logout</Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>  
              </>
            )}

        </nav>        
    
    </div>

  )
}
  