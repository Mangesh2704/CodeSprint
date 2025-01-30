import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../useAuth';

function Header() {
  const { user, setUserData } = useAuth();
  console.log("User:", user);

  const handleLogout = () => {
    // Logic to handle logout (e.g., clearing session or localStorage, making API call)
    setUserData(null); // Set the user to null or reset any session management logic
  };

  return (
    <div>
      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-map-marker-alt me-3" />
              CityCare
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/Contact" className="nav-item nav-link">
                Contact
              </Link>
              
              {/* If user is logged in, show My Complaints */}
              {user ? (
                <>
                  <Link to="/my-complaints" className="nav-item nav-link">
                    My Complaints
                  </Link>

                  {/* If user role is 'admin', show All Complaints */}
                  {user.role === 'admin' && (
                    <Link to="/all-complaints" className="nav-item nav-link">
                      All Complaints
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button onClick={handleLogout} className="btn btn-primary rounded-pill py-2 px-4">
                    Logout
                  </button>
                </>
              ) : (
                // If user is not logged in, show Login and Register buttons
                <>
                  <Link to="/Login" className="btn btn-primary rounded-pill py-2 px-4">
                    Login
                  </Link>
                  <Link to="/Register" className="btn btn-primary rounded-pill py-2 px-4">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar & Hero End */}
    </div>
  );
}

export default Header;
