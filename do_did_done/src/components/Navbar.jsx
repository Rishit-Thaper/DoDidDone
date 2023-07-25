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
            {user && (
              <>
                <Link className='username'>{user.email}</Link>        
                <Link className='logout' onClick={handleClick}>Logout</Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>  
              </>
            )}
            {user && (
              <span className='hidden'>
                <Link className='username'>{user.email}</Link>        
                <Link onClick={handleClick}>Logout</Link>
              </span>
            )}
        </nav>        
    
    </div>

  )
}
  