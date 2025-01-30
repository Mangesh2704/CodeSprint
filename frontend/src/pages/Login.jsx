import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Use useNavigate instead of useHistory
import axios from 'axios'
axios.defaults.withCredentials = true

export default function Login() {
  const [email, setEmail] = useState('') // To store email input
  const [password, setPassword] = useState('') // To store password input
  const [error, setError] = useState('') // To handle error messages
  const navigate = useNavigate() // Use useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset error state
    setError('')

    try {
      const response = await axios.post('https://your-api-url.com/login', {
        email,
        password,
      })

      // Check if login was successful and redirect
      if (response.data.success) {
        // Redirect user to dashboard or home after login
        navigate('/dashboard') // Use navigate instead of history.push
      } else {
        setError('Invalid credentials, please try again.') // Set error message if login fails
      }
    } catch (error) {
      setError('An error occurred, please try again later.') // Set error message on network error
    }
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Municipal Services
          </h6>
          <h1 className="mb-5">Citizen Login</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="border rounded p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Handle email input change
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Handle password input change
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  {error && (
                    <div className="col-12 text-danger text-center mb-3">
                      <p>{error}</p>
                    </div>
                  )}
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link
                        to="/signup"
                        className="text-primary fw-bold"
                        style={{ textDecoration: 'underline' }}
                      >
                        Sign Up Here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
