import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]) // To store the list of complaints
  const [loading, setLoading] = useState(true) // To show loading state while fetching complaints
  const [error, setError] = useState('') // To store error messages
  const navigate = useNavigate()

  // Fetch complaints when the component is mounted
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Assuming an endpoint that fetches complaints for the logged-in user
        const response = await axios.get('https://your-api-url.com/get-complaints')
        setComplaints(response.data.complaints) // Set the complaints list in state
      } catch (err) {
        setError('Failed to fetch complaints.')
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  // Delete a complaint
  const handleDelete = async (complaintId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this complaint?')
      if (!confirmDelete) return

      // Sending DELETE request to remove the complaint
      const response = await axios.delete(`https://your-api-url.com/complaints/${complaintId}`)
      if (response.data.success) {
        // Remove the deleted complaint from the local state
        setComplaints(complaints.filter(complaint => complaint._id !== complaintId))
      } else {
        setError('Failed to delete the complaint.')
      }
    } catch (err) {
      setError('An error occurred while deleting the complaint.')
    }
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Municipal Services
          </h6>
          <h1 className="mb-5">My Complaints</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            {/* Error message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {/* Complaints Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : complaints.length > 0 ? (
                    complaints.map((complaint) => (
                      <tr key={complaint._id}>
                        <td>
                          {/* Display the image if it exists */}
                          {complaint.image ? (
                            <img
                              src={complaint.image} // Image URL fetched from the server
                              alt={complaint.title}
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                          ) : (
                            <span>No image</span>
                          )}
                        </td>
                        <td>{complaint.title}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.location}</td>
                        <td>{complaint.status}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(complaint._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No complaints found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
