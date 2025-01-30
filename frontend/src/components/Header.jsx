import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
         {/* Spinner Start */}
    {/* <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border text-primary"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
    {/* Spinner End */}

    {/* Navbar & Hero Start */}
    <div className="container-fluid position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <i className="fa fa-map-marker-alt me-3" />
            CityCare
          </h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
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
            {/* <Link to="/About" className="nav-item nav-link">
              About
            </Link>
            <Link to="/Services" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/Packages" className="nav-item nav-link">
              Packages
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu m-0">
                <Link to="/Destination" className="dropdown-item">
                  Destination
                </Link>
                <Link to="/Booking" className="dropdown-item">
                  Booking
                </Link>
                <Link to="/Team" className="dropdown-item">
                  Travel Guides
                </Link>
                <Link to="/Testimonial" className="dropdown-item">
                  Testimonial
                </Link>
                <Link to="/Error" className="dropdown-item">
                  404 Page
                </Link>
              </div>
            </div> */}
            <Link to="/Contact" className="nav-item nav-link">
              Contact Us
            </Link>
            <Link to="/AddComplaints" className="nav-item nav-link">
            Add Complaints
          </Link>
          <Link to="/MyComplaints" className="nav-item nav-link">
            My Complaints
          </Link>
          <Link to="/Admin" className="nav-item nav-link">
            Admin Dashboard
          </Link>
          </div>
          <Link to="/Login" className="btn btn-primary rounded-pill py-2 px-4">
            Register
          </Link>
        </div>
      </nav>
    </div>
    {/* Navbar & Hero End */}
    </div>
  )
}

export default Header