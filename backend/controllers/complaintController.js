import mongoose  from 'mongoose';
import { User } from '../models/Schema.js';
import {Complaint } from  '../models/Complaint.js';


//create complaint
const createComplaint = async (req, res) => {
    try {
        const { user, title, description, category, location } = req.body;
        console.log(req.body)

        // Get the image path if file was uploaded
        let imagePath = '';
        if (req.file) {
            imagePath = req.file.path;  // Multer stores the file path in req.file.path
        }
        // Create a new complaint instance
        const newComplaint = new Complaint({
            user,
            title,
            description,
            category,
            location,
            imagePath  
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


// Get complaints by citizen
const getComplaintsByUserId = async (req, res) => {
    try {
        console.log(req.params.userId)
        const userId = req.params.userId;

        const complaints = await Complaint.find({ user:userId });
           
        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found for this citizen.' });
        }

        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
    }
};


// Update the status of a complaint (e.g., mark as resolved)
const updateComplaintStatus = async (req, res) => {
    try {
        const  complaintId  = req.params.complaintId;
        console.log(complaintId)
        const { status } = req.body;

        // Find the complaint and update its status
        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint status updated successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error updating complaint status', error: error.message });
    }
};



// Delete a complaint (e.g., if it was reported by mistake)
const deleteComplaint = async (req, res) => {
    try {
        const  complaintId  = req.params.complaintId;

        // Find the complaint and delete it
        const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting complaint', error: error.message });
    }
};



export default {createComplaint,getAllComplaints,getComplaintsByUserId,updateComplaintStatus,deleteComplaint}