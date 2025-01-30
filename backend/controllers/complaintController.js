import mongoose  from 'mongoose';
const Complaint = require('../models/Complaint');

const User = require('../models/Schema');

//create complaint
const createComplaint = async (req, res) => {
    try {
        const { user, title, description, category, location } = req.body;

        // Create a new complaint instance
        const newComplaint = new Complaint({
            user,
            title,
            description,
            category,
            location
        });

        // Save the complaint to the database
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully', newComplaint });
    } catch (error) {
        res.status(500).json({ message: 'Error creating complaint', error: error.message });
    }
};

export default {createComplaint}
module.exports = {
    
    // getAllComplaints,
    // getComplaintsByCitizen,
    // updateComplaintStatus,
    // deleteComplaint,
    // getComplaintById
};