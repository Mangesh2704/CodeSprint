// Signup.jsx
import React from 'react'

export default function Signup() {
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
              <form>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
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
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="role"
                        disabled
                      >
                        <option value="user">Citizen</option>
                      </select>
                      <label htmlFor="role">Account Type</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Register
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