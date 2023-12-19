import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <>
      <header>
        <Link to={'/'}>Home</Link>
        <nav>
          {user && (
            <div>
              <button onClick={handleClick}>Log out</button>
              <span>{user.email}</span>
            </div>
          )}
          {!user && (
            <div>
              <Link to={'/login'}>Login</Link>
              <Link to={'/signup'}>Signup</Link>
            </div>
          )}
          
        </nav>
      </header>
    </>
  )
}

export default Navbar
