import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddComplaint() {
  const [userEmail, setUserEmail] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('pothole')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the user's email (assuming an API endpoint that returns the logged-in user's email)
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/get-user-email')
        setUserEmail(response.data.email) // Assuming the response contains the user's email
      } catch (err) {
        setError('Failed to fetch user email')
      }
    }

    fetchUserEmail()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !location || !image) {
      setError('All fields are required.')
      return
    }

    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('email', userEmail)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('location', location)
    formData.append('image', image)

    try {
      const response = await axios.post('https://your-api-url.com/complaints', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.data.success) {
        navigate('/dashboard') // Redirect to the dashboard or success page
      } else {
        setError('Complaint submission failed. Please try again later.')
      }
    } catch (error) {
      setError('An error occurred while submitting the complaint.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Municipal Services
          </h6>
          <h1 className="mb-5">Add a Complaint</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="border rounded p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* User Email */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="user-email"
                        placeholder="Email Address"
                        value={userEmail}
                        disabled
                      />
                      <label htmlFor="user-email">User Email</label>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Complaint Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="pothole">Pothole</option>
                        <option value="street_light">Street Light</option>
                        <option value="garbage">Garbage</option>
                        <option value="water_supply">Water Supply</option>
                        <option value="other">Other</option>
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <label htmlFor="location">Location</label>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <label htmlFor="image">Add Image</label>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="col-12 text-danger text-center mb-3">
                      <p>{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Complaint'}
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
