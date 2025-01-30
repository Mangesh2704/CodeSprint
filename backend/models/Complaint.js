const mongoose = require('mongoose');

// Complaint Schema
const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (Citizen)
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Pothole', 'Streetlight', 'Garbage', 'Water Supply', 'Other'] // Example categories
    },
    location: {
        type: String,  // Can also be an object with latitude/longitude if needed
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'under investigation', 'resolved', 'closed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
    resolvedAt: {
        type: Date
    },
    
});

// Compile the schema into a model
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
