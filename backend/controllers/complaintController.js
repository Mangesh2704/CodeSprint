import mongoose  from 'mongoose';
import { User } from '../models/Schema.js';
import {Complaint } from  '../models/Complaint.js';


//create complaint
const createComplaint = async (req, res) => {
    try {
        const { user, title, description, category, location } = req.body;
        console.log(req.body)
        // Create a new complaint instance
        const newComplaint = new Complaint({
            user,
            title,
            description,
            category,
            location
        });

        // // Save the complaint to the database
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully', newComplaint });
    } catch (error) {
        res.status(500).json({ message: 'Error creating complaint', error: error.message });
    }
};

// Get all complaints (for authorities or admins)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
    }
};






export default {createComplaint,getAllComplaints}