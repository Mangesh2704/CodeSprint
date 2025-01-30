const mongoose = require('mongoose');

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',  // Reference to the Complaint model
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (Citizen)
        required: true
    },
    rating: {
        type: Number,
        min: 1,   // Minimum rating is 1
        max: 5,   // Maximum rating is 5
        required: true
    },
    comments: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Compile the schema into a model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
