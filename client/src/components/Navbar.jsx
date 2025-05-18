import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 px-4 py-3 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <Link to="/" className="text-white text-2xl font-semibold">
      Prescription App
    </Link>
    <div className="space-x-4 text-sm">
      {user ? (
        <>
          <span className="text-white capitalize">{user.role}</span>
          <button onClick={logout} className="text-white hover:underline">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;