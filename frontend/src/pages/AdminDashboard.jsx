import React, { useState, useEffect } from 'react'

export default function AdminDashboard() {
  // Dummy data for testing, including image URLs
  const [complaints, setComplaints] = useState([
    {
      _id: '1',
      email: 'user1@example.com',
      title: 'Pothole on Main Street',
      category: 'Pothole',
      location: 'Main Street, City Center',
      status: 'Pending',
      image: 'https://via.placeholder.com/100', // Dummy image URL
    },
    {
      _id: '2',
      email: 'user2@example.com',
      title: 'Broken Street Light',
      category: 'Street Light',
      location: 'Downtown Area',
      status: 'Completed',
      image: 'https://via.placeholder.com/100', // Dummy image URL
    },
    {
      _id: '3',
      email: 'user3@example.com',
      title: 'Garbage Overflow',
      category: 'Garbage',
      location: 'Park Lane',
      status: 'Pending',
      image: 'https://via.placeholder.com/100', // Dummy image URL
    },
    {
      _id: '4',
      email: 'user4@example.com',
      title: 'Water Supply Issue',
      category: 'Water Supply',
      location: 'Old Town',
      status: 'Revoke',
      image: 'https://via.placeholder.com/100', // Dummy image URL
    },
  ])
  
  const [loading, setLoading] = useState(false) // This is just for consistency, though we're not making an actual request
  const [error, setError] = useState('') // To store error messages

  // Simulate deleting a complaint
  const handleDelete = (complaintId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this complaint?')
    if (!confirmDelete) return

    // Remove the deleted complaint from the local state
    setComplaints(complaints.filter((complaint) => complaint._id !== complaintId))
  }

  // Simulate changing the status of a complaint
  const handleStatusChange = (complaintId, newStatus) => {
    // Update the status of the complaint in the state
    setComplaints(
      complaints.map((complaint) =>
        complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    )
  }

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Admin Dashboard
          </h6>
          <h1 className="mb-5">All Complaints</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-12">
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
                    <th>User Email</th>
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
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : complaints.length > 0 ? (
                    complaints.map((complaint) => (
                      <tr key={complaint._id}>
                        {/* Image */}
                        <td>
                          <img
                            src={complaint.image} // The image URL from the complaint data
                            alt={complaint.title}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{complaint.email}</td>
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
                          {' '}
                          <button
                            className="btn btn-success"
                            onClick={() => handleStatusChange(complaint._id, 'Completed')}
                          >
                            Mark as Completed
                          </button>
                          {' '}
                          <button
                            className="btn btn-warning"
                            onClick={() => handleStatusChange(complaint._id, 'Pending')}
                          >
                            Mark as Pending
                          </button>
                          {' '}
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleStatusChange(complaint._id, 'Revoke')}
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
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
