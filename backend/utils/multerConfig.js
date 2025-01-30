import multer from 'multer'
import path from 'path'

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, 'uploads/complaints/');
    },
    filename: (req, file, cb) => {
        // Set the file name to ensure uniqueness (timestamp + file extension)
        cb(null, Date.now() + path.extname(file.originalname));  // Example: 1616161616161.jpg
    }
});

// File filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only image files are allowed'), false);  // Reject the file
    }
};

// Create the upload middleware using the storage engine and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Max file size: 5MB
    fileFilter: fileFilter
});

export default {upload}