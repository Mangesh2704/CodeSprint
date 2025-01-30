import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // For redirecting after successful registration

export default function Signup() {
  const [email, setEmail] = useState('') // For email input
  const [password, setPassword] = useState('') // For password input
  const [error, setError] = useState('') // To store error messages
  const [loading, setLoading] = useState(false) // To show loading state
  const navigate = useNavigate() // To redirect after registration

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset error and loading states
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://172.20.111.16:3000/user/register', {
        email,
        password,
      })

      if (response.data.success) {
        // Redirect to login page after successful registration
        navigate('/login')
      } else {
        setError('Registration failed, please try again.') // Show error if registration fails
      }
    } catch (error) {
      setError('An error occurred, please try again later.') // Show error for network or API failure
    } finally {
      setLoading(false) // Turn off loading state
    }
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Municipal Services
          </h6>
          <h1 className="mb-5">Citizen Registration</h1>
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
                  <div className="col-12">
                    <div className="form-floating">
                      <select className="form-select" id="role" disabled>
                        <option value="user">Citizen</option>
                      </select>
                      <label htmlFor="role">Account Type</label>
                    </div>
                  </div>

                  {error && (
                    <div className="col-12 text-danger text-center mb-3">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? 'Registering...' : 'Register'} {/* Show loading state */}
                    </button>
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
